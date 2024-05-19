import {
  AvatarKey,
  MessageRole,
  TPersonBaseData,
  TPersonChatData,
} from '@/lib/types/person.types';
import { ObjectId } from 'mongoose';

export type TBaseChatMessage = {
  content: string;
  role: MessageRole;
  timestamp: number;
  emotion?: string;
};

export type TChatMessageDb = TBaseChatMessage & {
  _id: ObjectId;
  chatId: ObjectId;
};

export type TChatMessage = TBaseChatMessage & {
  chatId: string;
};

export type TChat = {
  _id: ObjectId;
  user: ObjectId;
  title: string;
  person: ObjectId;
  personName: string;
  messages: TChatMessageDb[];
  tokens?: {
    input: number;
    output: number;
  };
};

export type TChatData = {
  title: string;
  person: TPersonBaseData & {
    _id: string;
    name: string;
  };
  messages: TChatMessage[];
};

export type TChatItem = {
  chatId: string;
  title: string;
  person: {
    name: string;
    status: string;
    avatarBlur: string;
    avatarKey: AvatarKey;
  };
};

export type TCreateChatArgs = {
  userId: string;
  title: string;
  personId: string;
  personName: string;
  path: string;
};

export type TCreateMessageArgs = Pick<TChatMessage, 'content' | 'role'> & {
  chatId: string;
  timestamp: number;
  path?: string;
  emotion?: string;
};
