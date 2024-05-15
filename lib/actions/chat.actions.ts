'use server';

import { ObjectId } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { fetchPersonDataForLLM } from '@/lib/actions/person.actions';
import { fetchUserByEmail } from '@/lib/actions/user.actions';
import { connectToDB } from '@/lib/db';
import ChatModel from '@/lib/models/chat.model';
import MessageModel from '@/lib/models/message.model';
import PersonModel from '@/lib/models/person.model';
import UserModel from '@/lib/models/user.model';
import {
  TChatMessage,
  TChatMessageDb,
  TCreateChatArgs,
  TCreateMessageArgs,
} from '@/lib/types/chat.types';
import { TServerActionResult } from '@/lib/types/common.types';
import { MessageRole } from '@/lib/types/person.types';
import { createChainForPerson, extractEmotionFromText } from '@/lib/utils/chat';
import { handleActionError } from '@/lib/utils/error';

export const createChat = async ({
  userId,
  title,
  personId,
  personName,
}: TCreateChatArgs): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    // Create a new chat
    const chat = new ChatModel({
      title,
      user: userId,
      person: personId,
      personName,
      messages: [],
    });

    // Save the chat
    await chat.save();

    return {
      success: true,
      data: chat._id.toString(),
    };
  } catch (err: any) {
    return handleActionError('Could not create a chat', err);
  }
};

export const fetchChat = async ({
  chatId,
  userEmail,
}: {
  chatId: ObjectId | string;
  userEmail: string;
}): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    // await sleep(5000);

    // Get user object id
    const user = await fetchUserByEmail(userEmail);
    if (!user?.success) {
      return handleActionError('Could not find the user', null, true);
    }

    // Find a chat by id
    const chat = await ChatModel.findById(chatId)
      .populate({
        path: 'person',
        model: PersonModel,
        select:
          'id title gender avatarKey personKey status bio avatarBlur imgBlur',
      })
      .populate({
        path: 'messages',
        model: MessageModel,
        select: 'content emotion role timestamp',
      });

    if (!chat) {
      return handleActionError('Could not find a chat');
    }

    if (chat.user.toString() !== user.data.id) {
      return handleActionError(
        'User with te provided email is not allowed to fetch this chat',
        null,
        true
      );
    }

    const parsedMessages: TChatMessage[] = chat.messages.map(
      (m: TChatMessageDb) => ({
        chatId,
        content: m.content,
        role: m.role,
        timestamp: m.timestamp,
        emotion: m.emotion,
      })
    );

    const person = chat.person;

    return {
      success: true,
      data: {
        title: chat.title || chat.personName,
        person: {
          _id: person._id.toString(),
          title: person.title,
          name: chat.personName,
          gender: person.gender,
          avatarKey: person.avatarKey,
          avatarBlur: person.avatarBlur,
          imgBlur: person.imgBlur,
          personKey: person.personKey,
          status: person.status,
          bio: person.bio,
        },
        messages: parsedMessages,
      },
    };
  } catch (err: any) {
    return handleActionError('Could not fetch chat', err);
  }
};

export const fetchUserChats = async ({
  userEmail,
}: {
  userEmail: string;
}): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    // Find user by email
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      handleActionError(
        `Could not find a user for provided email ${userEmail}`
      );
    }

    const userId = user._id;

    // Find chats, populate person
    const fetchedChats = await ChatModel.find({ user: userId }).populate({
      path: 'person',
      model: PersonModel,
      select: 'status avatarBlur avatarKey',
    });

    // Configure output data
    const chats = fetchedChats.map((c) => ({
      chatId: c._id.toString(),
      title: c.title || c.personName,
      person: {
        name: c.personName,
        status: c.person.status,
        avatarBlur: c.person.avatarBlur,
        avatarKey: c.person.avatarKey,
      },
    }));

    return {
      success: true,
      data: chats,
    };
  } catch (err: any) {
    console.log('err', err);
    return handleActionError('Could not fetch user chat list', err);
  }
};

export const clearChat = async ({
  chatId,
  path,
}: {
  chatId: string;
  path: string;
}): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    // Find a chat by id
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return handleActionError(
        'Could not find a chat for the provided id',
        null
      );
    }

    // Clear chat messages
    chat.messages = [];
    await chat.save();

    // Remove the messages that belong the chat
    await MessageModel.deleteMany({ chatId });

    // Update cache
    revalidatePath(path);

    return {
      success: true,
      data: 'Chat cleared.',
    };
  } catch (err: any) {
    return handleActionError('Could not clear the chat', err);
  }
};

export const deleteChat = async ({
  chatId,
  path,
}: {
  chatId: string;
  path: string;
}): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    // Delete the chat
    const chat = await ChatModel.findByIdAndDelete(chatId);
    if (!chat) {
      return handleActionError(
        'Could not find a chat for the provided id',
        null
      );
    }

    // Delete the messages that belong the chat
    await MessageModel.deleteMany({ chatId });

    // Update cache
    revalidatePath(path);

    return {
      success: true,
      data: 'Chat cleared.',
    };
  } catch (err: any) {
    return handleActionError('Could not clear the chat', err);
  }
};

export const createChatMessage = async ({
  chatId,
  content,
  role,
  path,
  timestamp,
  emotion,
}: TCreateMessageArgs): Promise<TServerActionResult | undefined> => {
  if (!chatId || !content || !role || !timestamp) {
    return handleActionError('Invalid message data', null);
  }

  const message = new MessageModel({
    chatId,
    content,
    role,
    timestamp,
  });

  // Assign an emotion
  if (emotion) {
    message.emotion = emotion;
  }

  try {
    await connectToDB();

    // Save message in db
    const newMessage = await message.save();

    // Find a chat
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return handleActionError(
        'Could not find a chat for the provided id',
        null,
        true
      );
    }

    // Add message to chat
    const messages = [...chat.messages];
    messages.push(message);
    chat.messages = messages;
    chat.save();

    // Update cache
    path && revalidatePath(path);

    const parsedMessage: TChatMessage = {
      chatId: newMessage.chatId.toString(),
      content: newMessage.content,
      role: newMessage.role,
      timestamp: newMessage.timestamp,
    };

    if (newMessage.emotion) {
      parsedMessage.emotion = newMessage.emotion;
    }

    return {
      success: true,
      data: parsedMessage,
    };
  } catch (err: any) {
    console.log('err', err);
    return handleActionError('Could not create a message', err);
  }
};

/**
 * Calls a LLM API to generate a response based on the human input.
 * Saves the conversation messages in a database.
 *
 * Fetches a person data.
 * Creates a chain for the person.
 * Invoks a LLM API to generate a response.
 * Extracts an emotion from the answer.
 * The person's and AI's messages will be saved in db.
 *
 * @param humanMessage a message `TChatMessage & { path: string }` sent by a human user.
 * @returns @returns a Promise that resolves to a TServerActionResult object or undefined. data: { emotion, message }
 */
export const askAI = async (
  humanMessage: TChatMessage & { path: string }
): Promise<TServerActionResult | undefined> => {
  try {
    // Get a path prop
    const { path, ...humanMessageData } = humanMessage;

    // Fetch a person
    const personRes = await fetchPersonDataForLLM({
      chatId: humanMessageData.chatId,
    });
    if (!personRes?.success) {
      return handleActionError('Could not fetch the person', null);
    }
    // const personName = chatRes.data.personName;
    // const personId = person._id;

    // if (!personId) {
    //   return handleActionError('Invalid person ID', null);
    // }

    // // Fetch the instructions and context for LLM
    // const personRes = await fetchPersonDataForLLM(personId);
    // if (!personRes?.success) {
    //   return handleActionError('Could not fetch a person data');
    // }

    // // Add person name from a chat object
    // const personData = {
    //   name: personName,
    //   ...person,
    // };

    // Create a chain for the person
    const chainRes = await createChainForPerson({
      chatId: humanMessageData.chatId,
      person: personRes.data,
    });
    if (!chainRes.chain) {
      return handleActionError(
        chainRes.error || 'Could not create a chain for the person'
      );
    }

    // Ask AI
    const aiRes = await chainRes.chain.invoke({
      question: humanMessageData.content,
    });

    // Extract an emotion from the answer
    const { emotion, message } = extractEmotionFromText(aiRes.result);
    if (!message) {
      return handleActionError('Could not get an answer from AI');
    }

    // Save a person's message in db
    // Do not add the `path` parameter to avoid executing `revalidatePath` after saving a person's message
    const humanMessageRes = await createChatMessage(humanMessageData);
    if (!humanMessageRes?.success) {
      return handleActionError(`Could not save a person's message in db`);
    }

    // Configure ai message
    const aiMessage = {
      chatId: humanMessage.chatId,
      content: message,
      role: MessageRole.ai,
      timestamp: new Date().getTime(),
      emotion,
      path,
    };

    // Save ai message
    // Run `revalidatePath` after ai message save, therefore add a `path` prop
    const aiMessageRes = await createChatMessage(aiMessage);
    if (!aiMessageRes?.success) {
      return handleActionError('Could not save ai message in db');
    }

    return {
      success: true,
      data: { emotion, message },
    };
  } catch (err: any) {
    console.log('ERR', err);
    return handleActionError('Unable to ask ai', err);
  }
};
