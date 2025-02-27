import { NextAuthConfig } from 'next-auth';

export default {
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
  },
  providers: [],
} satisfies NextAuthConfig;
