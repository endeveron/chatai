import { z } from 'zod';

const email = z.string().email({
  message: 'Please provide a valid email.',
});

export const signUpSchema = z.object({
  email,
});

export const signInSchema = z.object({
  email,
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export const onboardingSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match.',
  });

export type TSignInSchema = z.infer<typeof signInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TOnboardingSchema = z.infer<typeof onboardingSchema>;
