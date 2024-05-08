import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { authorizeUser, signInSocial } from '@/lib/actions/auth.actions';
import authConfig from '@/lib/configs/auth.config';
import { signInSchema } from '@/lib/schemas/auth';
import { UserRole } from '@/lib/types/user.types';
import { SocialProvider } from '@/lib/types/auth.types';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ account, profile }) {
      // Handle authentication using Google provider
      if (account && profile && account.provider === 'google') {
        // Check user email
        if (
          !profile.email ||
          !profile.email_verified ||
          !profile.email?.endsWith('@gmail.com')
        ) {
          return false;
        }
        // Add user to the database if it has not been created
        const { email, email_verified, name, picture } = profile;
        const res = await signInSocial({
          provider: SocialProvider.google,
          email,
          emailVerified: email_verified,
          name: name,
          image: picture,
        });
        if (!res?.success) return false;
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // Add a user role to the token
      if (user) token.role = user?.role || UserRole.user;
      return token;
    },
    async session({ session, token }) {
      // Persist the user objectId
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      // Persist the user role
      // https://authjs.dev/guides/basics/role-based-access-control#with-jwt
      if (session.user && token.role) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const result: User | null = await authorizeUser({ email, password });
          return result;
        }
        console.error('Invalid credentials');
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
