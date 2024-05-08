import { MessageRole, TPersonChatData } from '@/lib/types/person.types';
import { ObjectId } from 'mongoose';

export type TBaseChatMessage = {
  content: string;
  role: MessageRole;
  timestamp: number;
  emotion?: string;
};

export type TChatMessageDb = TBaseChatMessage & {
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
  messages: TChatMessage[];
};

export type TChatData = Omit<TChat, 'person'> & {
  person: TPersonChatData<ObjectId>;
};

export type TChatItem = Omit<TChat, '_id' | 'user' | 'person' | 'messages'> & {
  chatId: string;
  person: TPersonChatData<string>;
};

export type TCreateChatArgs = {
  userId: string;
  title: string;
  personId: string;
  personName: string;
};

export type TCreateMessageArgs = Pick<TChatMessage, 'content' | 'role'> & {
  chatId: string;
  timestamp: number;
  path?: string;
  emotion?: string;
};

export enum ChatUrlParam {
  list = 'list',
  new = 'new',
  details = 'details',
}
