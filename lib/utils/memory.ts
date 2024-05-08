import { BufferMemory } from 'langchain/memory';
// import { MongoDBChatMessageHistory } from '@langchain/mongodb';
// import { nanoid } from '@/lib/utils';

let messageMemory: BufferMemory;

export const getMessageMemory = () => {
  if (messageMemory) return messageMemory;

  // // Initialize chat history
  // const chatHistory = new MongoDBChatMessageHistory({
  //   collection: myCollection,
  //   sessionId: nanoid(),
  // });

  // Initialize the buffer memory to store chat history
  messageMemory = new BufferMemory({
    memoryKey: 'chatHistory',
    inputKey: 'question', // The key for the input to the chain
    outputKey: 'text', // The key for the final conversational output of the chain
    returnMessages: true, // Return as a list of messages. By default, they are returned as a single string.
    // chatHistory, // Store chat history in db
  });
  return messageMemory;
};
