import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

// Safety settings: https://ai.google.dev/gemini-api/docs/safety-settings

export const llmConfig = {
  modelName: 'gemini-pro',
  maxOutputTokens: 50,
  temperature: 0.8,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
};
