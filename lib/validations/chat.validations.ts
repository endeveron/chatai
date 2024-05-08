import * as zod from 'zod';

export const ChatInputValidation = zod.object({
  message: zod.string().min(2, { message: 'Minimum 2 characters.' }),
});
