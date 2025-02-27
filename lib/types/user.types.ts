import { ObjectId } from 'mongoose';
import { SocialProvider } from '@/lib/types/auth.types';

export enum UserRole {
  user = 'user',
  admin = 'admin',
}

export type TUser = {
  _id: ObjectId;
  role: UserRole;
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  emailVerified?: boolean;
  password?: string;
  image?: string;
  provider?: SocialProvider;
};

export type TUserData = {
  name: string;
  email: string;
};
