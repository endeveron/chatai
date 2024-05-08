import { ObjectId } from 'mongoose';

import { UserRole } from '@/lib/types/user.types';

declare module 'next-auth' {
  interface User {
    role: UserRole;
  }
  // interface Session { user: User }
}

export enum SocialProvider {
  google = 'google',
}

export type TCredentials = {
  email: string;
  password: string;
};

export type TSignInArgs = TCredentials;

export type TSignInSocialArgs = {
  provider: SocialProvider;
  email: string;
  emailVerified: boolean;
  name: string | null | undefined;
  image: string | null | undefined;
};

export type TSignUpArgs = {
  email: string;
};

export type TOnboardUserArgs = {
  userObjId: string;
  name: string;
  password: string;
};

export type TToken = {
  _id: ObjectId;
  email: string;
  token: string;
  id?: string;
  expiresAt?: number;
};

export type TAccount = {
  _id: ObjectId;
  userId: string;
  type: string;
  provider: string;
  id?: string;
  providerAccountId: string;
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: Date;
  tokenType?: string;
  scope?: string;
  idToken?: string;
  sessionState?: string;
};

export type TCreateUserArgs = {
  email: string;
};
