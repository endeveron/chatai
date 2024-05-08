import { Schema, model, models } from 'mongoose';

import { TChat } from '@/lib/types/chat.types';

const chatSchema = new Schema<TChat>({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  personName: { type: String, require: true },
  person: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

const ChatModel = models.Chat || model('Chat', chatSchema);

export default ChatModel;
