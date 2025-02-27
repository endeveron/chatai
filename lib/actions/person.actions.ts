'use server';

import { ObjectId } from 'mongoose';

import { connectToDB } from '@/lib/db';
import ChatModel from '@/lib/models/chat.model';
import PersonModel from '@/lib/models/person.model';
import { TServerActionResult } from '@/lib/types/common.types';
import { TPerson, TPersonCardData } from '@/lib/types/person.types';
import { handleActionError } from '@/lib/utils/error';

export const createPerson = async ({
  gender,
  avatarKey,
  personKey,
  status,
  bio,
  instructions,
  context,
}: TPerson): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    // Create a new person
    const newPerson = new PersonModel({
      gender,
      avatarKey,
      personKey,
      status,
      bio,
      instructions,
      context,
    });

    // Save the person
    await newPerson.save();

    return {
      success: true,
      data: { personId: newPerson._id },
    };
  } catch (err: any) {
    return handleActionError('Could not create a person', err);
  }
};

export const fetchPersonDataForLLM = async ({
  chatId,
}: {
  chatId: ObjectId | string;
}): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    // Find a chat by id
    const chat = await ChatModel.findById(chatId).populate({
      path: 'person',
      model: PersonModel,
      select:
        '_id title gender avatarKey personKey status bio instructions context',
    });

    if (!chat) {
      return handleActionError(
        'Could not find a chat for the provided chat id'
      );
    }

    return {
      success: true,
      data: {
        _id: chat.person._id.toString(),
        name: chat.personName,
        title: chat.person.title,
        status: chat.person.status,
        gender: chat.person.gender,
        bio: chat.person.bio,
        personKey: chat.person.personKey,
        avatarKey: chat.person.avatarKey,
        instructions: chat.person.instructions,
        context: chat.person.context,
      },
    };
  } catch (err: any) {
    return handleActionError('Could not fetch chat', err);
  }
};

/**
 * Fetches a people list from a database.
 *
 * @returns a Promise that resolves to a `TServerActionResult` object or `undefined`.
 */
export const fetchPeople = async (): Promise<
  TServerActionResult | undefined
> => {
  try {
    await connectToDB();

    const people = await PersonModel.find().select(
      '_id title gender avatarKey personKey status imgBlur'
    );

    const peopleData: TPersonCardData[] = people.map((p) => ({
      _id: p._id.toString(),
      title: p.title,
      gender: p.gender,
      avatarKey: p.avatarKey,
      personKey: p.personKey,
      status: p.status,
      imgBlur: p.imgBlur,
    }));

    return {
      success: true,
      data: peopleData,
    };
  } catch (err: any) {
    return handleActionError('Could not get person', err);
  }
};
