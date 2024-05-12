import { PromptTemplate } from '@langchain/core/prompts';

export const summarizeChatHistoryTemplate = PromptTemplate.fromTemplate(`
Summary the sentenses below as much detail as possible. Save the name, favors, fears, visited places, goals, dreams, thoughts, aspirations, emotions etcetera. Output the detailed summary as one line of plain text, do not use markdown.
----------
Sentenses: {chatHistory}
`);

export const questionGeneratorTemplate = PromptTemplate.fromTemplate(`
Given the chat history and a follow up question, rephrase the follow up question to be a standalone question.
----------
Chat history: {chatHistory}
Question: {question}
`);
