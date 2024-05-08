import { Schema, model, models } from 'mongoose';

import { TChatMessageDb } from '@/lib/types/chat.types';
import { MessageRole } from '@/lib/types/person.types';

const messageSchema = new Schema<TChatMessageDb>({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
  },
  content: { type: String, required: true },
  role: { type: String, enum: MessageRole, default: MessageRole.human },
  emotion: { type: String },
  timestamp: { type: Number, required: true },
});

const MessageModel = models.Message || model('Message', messageSchema);

export default MessageModel;
