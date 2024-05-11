import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { LLMChain } from 'langchain/chains';

import { llmConfig } from '@/lib/configs/llm.config';
import {
  questionGeneratorTemplate,
  summarizeChatHistoryTemplate,
} from '@/lib/data/prompts';
import { createQuestionTemplate } from '@/lib/utils/chat';

// Create a llm model
export const llm = new ChatGoogleGenerativeAI(llmConfig);

// This chain is used to generate a new question based on the
// provided chat history, context, and an initial question.
export const questionGeneratorChain = new LLMChain({
  llm,
  prompt: questionGeneratorTemplate,
});

// This chain is used to summarize the old chat messages
export const summarizeChatHistoryChain = new LLMChain({
  llm: llm,
  prompt: summarizeChatHistoryTemplate,
});

/** This chain is used for question answering based on
 *  the provided context and the question */
export const createMainChain = ({
  personName,
  personInstructions,
}: {
  personName: string;
  personInstructions: string;
}) => {
  // Configure the question template
  const questionTemplate = createQuestionTemplate({
    personName,
    personInstructions,
  });

  console.log('[createMainChain]: questionTemplate', questionTemplate);

  return new LLMChain({
    llm: llm,
    prompt: questionTemplate,
  });
};
