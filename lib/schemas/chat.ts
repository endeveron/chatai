import { z } from 'zod';

export const createChatSchema = z.object({
  personName: z.string(),
  title: z.string(),
});

export type TCreateChatSchema = z.infer<typeof createChatSchema>;
