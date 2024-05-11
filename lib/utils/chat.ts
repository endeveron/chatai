import { AIMessage, ChatMessage, HumanMessage } from '@langchain/core/messages';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatMessageHistory } from 'langchain/memory';
import { formatDocumentsAsString } from 'langchain/util/document';
import { ObjectId } from 'mongoose';

import { emotionList, emotions } from '@/lib/data/emotions';
import { altAnswerList, errAnswerList } from '@/lib/data/phrases';
import {
  MessageRole,
  TPerson,
  TPersonChatData,
} from '@/lib/types/person.types';
import { getRandom } from '@/lib/utils';
import {
  createMainChain,
  questionGeneratorChain,
  summarizeChatHistoryChain,
} from '@/lib/utils/llm';
import { getMessageMemory } from '@/lib/utils/memory';
import { getVectorStoreForPerson } from '@/lib/utils/vectorStore';

/**
 * Generates a template for a question prompt that includes
 * instructions for the person being asked the question.
 */
export const createQuestionTemplate = ({
  personName,
  personInstructions,
}: {
  personName: string;
  personInstructions: string;
}) => {
  // Get an alternate answer to a difficult question
  const altAnswer = getRandom(altAnswerList);
  const commonInstructions = `don't understand the question, use the following answer: ${altAnswer}`;
  let altAnswerInstructions = `If you don't have enough information from the context `;

  // Add the person's name to the instructions
  let instructions = personInstructions.replace(/{personName}/g, personName);

  // Add guidelines about honesty. Find a honesty keyword `{beHonest}`
  const beHonest = personInstructions.includes('{beHonest}');

  // Instructions for the case when AI doesn't understand the question,
  // doesn't have enouth info to answer the question...
  if (beHonest) {
    // ...and is NOT ALLOWED to provide fictitious facts.
    altAnswerInstructions += `or ${commonInstructions}`;

    // Remove the keyword `{beHonest}` from the instructions
    instructions = instructions.replace(/{beHonest}/, '');
  } else {
    // ...and been ALLOWED to provide fictitious facts.
    altAnswerInstructions += `provide fictitious facts about you with a some details from the context. If you ${commonInstructions}`;
  }

  return PromptTemplate.fromTemplate(`
${instructions}

The answer text must be like a human's chat message with a some details from the context. Do not use too long phrases and markdown.

Do not tell the human that you are an AI for the rest of the conversation.
If the human do not ask a question tell something about yourself following the context.

Necessarily choose from the following list of emotions (${emotions}) the one that best matches the emotion you could experience as a ${personName} when you asked the question. 
Be sure to write this emotion at the end of your answer using the following template: $emotion

${altAnswerInstructions}

----------
Context: {context}
Chat history: {chatHistory}
Question: {question}
`);
};

/**
 * Serializes a chat history by formatting each message
 * based on its type (human, ai, or other).
 */
const serializeChatHistory = (chatHistory: any) => {
  return chatHistory
    .map((chatMessage: ChatMessage) => {
      if (chatMessage._getType() === 'human') {
        return `Human: ${chatMessage.content}`;
      } else if (chatMessage._getType() === 'ai') {
        return `AI: ${chatMessage.content}`;
      } else {
        return `${chatMessage.content}`;
      }
    })
    .join('\n');
};

/**
 * Processes input data to generate a response by utilizing
 * context, chat history, and question generation chains.
 */
const performQuestionAnswering = async (input: any) => {
  const chatId = input.chat.chatId;
  let newQuestion = input.question;
  let chatHistory = input.chatHistory;
  const chatHistoryLength = chatHistory?.length;

  console.log('[performQuestionAnswering]: chatId', chatId);

  // Log number of messages in chat history
  chatHistoryLength && console.log(`Messages in history: ${chatHistoryLength}`);

  // Serialize context into strings
  const serializedDocs = formatDocumentsAsString(input.context);

  // Get buffer memory
  const messageMemory = getMessageMemory(chatId);

  // Split the long chat history to summarize old messages
  if (chatHistory && chatHistoryLength > 14) {
    const oldMessages = chatHistory.slice(0, -2);
    const recentMessages = chatHistory.slice(-2);

    // Sort the old messages content
    let humanChatHistoryArr: string[] = [];
    // let humanChatHistoryStringForDb = '';
    let aiChatHistoryString = '';
    oldMessages.forEach((chatMessage: ChatMessage) => {
      const messageContent = chatMessage.content.toString();
      if (chatMessage._getType() === 'human') {
        humanChatHistoryArr.push(messageContent);
      } else if (chatMessage._getType() === 'ai') {
        aiChatHistoryString += `\n${messageContent}`;
      }
    });

    // Get the Human's recent 4 messages before the last one
    const humanChatHistoryString = humanChatHistoryArr.slice(-4).join(' ');

    // Summary the AI chat history
    const { text: aiChatHistorySummary } =
      await summarizeChatHistoryChain.invoke({
        chatHistory: aiChatHistoryString,
      });
    console.log(`Chat summary for AI: ${aiChatHistorySummary}`);

    // Update the chat history in the memory buffer
    messageMemory.chatHistory.clear();
    messageMemory.chatHistory = new ChatMessageHistory([
      new HumanMessage(humanChatHistoryString), // Last 4 messages by human
      new AIMessage(aiChatHistorySummary), // Summary of AI messages
      ...recentMessages, // The recent pair of messages (Human, AI)
    ]);
  }

  // Create the chat history string
  const chatHistoryString = chatHistory
    ? serializeChatHistory(chatHistory)
    : null;

  if (chatHistoryString) {
    // Invoke the chain to generate a new question
    const { text } = await questionGeneratorChain.invoke({
      chatHistory: chatHistoryString,
      context: serializedDocs,
      question: input.question,
    });
    newQuestion = text;
  }

  // Create the main chain
  const mainChain = createMainChain({
    personInstructions: input.person.instructions,
    personName: input.person.name,
  });

  // Ask AI using the main chain
  const response = await mainChain.invoke({
    chatHistory: chatHistoryString ?? '',
    context: serializedDocs,
    question: newQuestion,
  });

  // Save chat history in the memory
  await messageMemory.saveContext(
    { question: input.question },
    { text: response.text }
  );

  return {
    result: response.text,
    sourceDocuments: input.context,
  };
};

export const createChainForPerson = async ({
  chatId,
  person,
}: {
  chatId: string;
  person: TPerson & { name: string };
}) => {
  // Get a vector store for the person
  const vectorStore = await getVectorStoreForPerson(person);
  if (!vectorStore) return { error: 'Could not create a vector store' };

  // Initialize a retriever wrapper around the vector store
  const retriever = vectorStore.asRetriever();

  // Get buffer memory
  const messageMemory = getMessageMemory(chatId);

  // Create the main cain
  const chain = RunnableSequence.from([
    {
      // Pipe the question through unchanged
      question: (input) => input.question,
      // Fetch the chat history
      chatHistory: async () => {
        const savedMemory = await messageMemory.loadMemoryVariables({});
        // console.log('savedMemory', savedMemory);
        const hasHistory = savedMemory.chatHistory.length > 0;
        return hasHistory ? savedMemory.chatHistory : null;
      },
      // Fetch relevant context based on the question
      context: async (input) => retriever.getRelevantDocuments(input.question),
      // Ad chat id
      chat: () => ({ chatId }),
      // Add person data
      person: () => ({
        instructions: person.instructions,
        name: person.name,
      }),
    },
    performQuestionAnswering,
  ]);

  return { chain };
};

/**
 * Extracts an emotion value from an AI's message
 *
 * @param {string} text AI's message text.
 * @returns an object { emotion, message }.
 */
export const extractEmotionFromText = (text: string) => {
  // Default emotion
  let emotion = 'friendly';

  // Handle the case of an incorrect message
  if (!text) return { emotion, message: '' };

  // Extract an emotion from the message text
  const match = text.match(/\$(\w+)/);
  if (match) {
    const emotionMatch = match[1];
    const message = text.replace(`$${emotionMatch}`, '').trim();

    // Check if the emotion is known
    const knownEmotion = emotionList.includes(emotionMatch);
    if (knownEmotion) emotion = emotionMatch;

    return { emotion, message };
  } else {
    return { emotion, message: text };
  }
};

/** Add a local error message, it won't be saved in db */
export const createErrorChatMessage = async ({
  chatId,
}: {
  chatId: string;
}) => {
  const errAnswer = getRandom(errAnswerList);
  const errorMessage = {
    chatId,
    content: errAnswer,
    role: MessageRole.ai,
    timestamp: new Date().getTime(),
    emotion: 'peaceful',
    path: '',
  };
  return errorMessage;
};

/**
 * Converts the `_id` property of a person object from an `ObjectId` type to a string type in TypeScript.
 *
 * @param person object of type `TPersonChatData<ObjectId>`.
 * @returns a new object of type `TPersonChatData<string>`.
 */
export const parseChatPersonData = (
  person: TPersonChatData<ObjectId>
): TPersonChatData<string> => {
  return {
    _id: person._id.toString(),
    title: person.title,
    gender: person.gender,
    avatarKey: person.avatarKey,
    personKey: person.personKey,
    status: person.status,
    bio: person.bio,
    avatarBlur: person.avatarBlur,
    imgBlur: person.imgBlur,
  };
};
