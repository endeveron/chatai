import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

// Safety settings: https://ai.google.dev/gemini-api/docs/safety-settings

export const llmConfig = {
  modelName: 'gemini-2.0-flash',
  maxOutputTokens: 100,
  temperature: 1,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
};
