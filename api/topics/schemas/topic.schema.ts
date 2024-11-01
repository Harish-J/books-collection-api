import { Schema } from 'mongoose';

export const TopicSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false }, // Include this parameter if needed
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
