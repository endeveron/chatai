import { messageMemoryMap } from '@/lib/data/maps';
import { BufferMemory } from 'langchain/memory';
// import { MongoDBChatMessageHistory } from '@langchain/mongodb';
// import { nanoid } from '@/lib/utils';

export const getMessageMemory = async (chatId: string) => {
  const memoryFromMap = messageMemoryMap.get(chatId);

  console.log('[getMessageMemory]: memoryFromMap', memoryFromMap);

  if (memoryFromMap) return memoryFromMap;

  // // Initialize chat history
  // const chatHistory = new MongoDBChatMessageHistory({
  //   collection: myCollection,
  //   sessionId: nanoid(),
  // });

  // Initialize the buffer memory to store chat history
  const messageMemory = new BufferMemory({
    memoryKey: 'chatHistory',
    inputKey: 'question', // The key for the input to the chain
    outputKey: 'text', // The key for the final conversational output of the chain
    returnMessages: true, // Return as a list of messages. By default, they are returned as a single string.
    // chatHistory, // Store chat history in db
  });

  console.log('[getMessageMemory]: new messageMemory', messageMemory);

  // Save chat messages memory to messageMemoryMap
  messageMemoryMap.set(chatId, messageMemory);
  return messageMemory;
};
