import { Schema } from 'mongoose';

export const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: false },
  isbn: { type: String, required: true, unique: true },
  topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
