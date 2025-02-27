import { Schema, model, models } from 'mongoose';

import { TPerson } from '@/lib/types/person.types';

const personSchema = new Schema<TPerson>({
  title: { type: String, required: true },
  gender: { type: String, required: true },
  avatarKey: { type: String, required: true },
  personKey: { type: String, required: true },
  status: { type: String, required: true },
  bio: { type: String, required: true },
  avatarBlur: { type: String, required: true },
  imgBlur: { type: String, required: true },
  instructions: { type: String, required: true },
  context: [{ type: String, required: true }],
  // vectorStore: {
  //   chunkSize: { type: Number, default: 250 },
  //   chunkOverlap: { type: Number, default: 0 },
  // },
});

const PersonModel = models.Person || model('Person', personSchema);

export default PersonModel;
