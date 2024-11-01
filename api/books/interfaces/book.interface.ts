import { Document } from 'mongoose';

export interface Book extends Document {
  title: string;
  author: string;
  publishedDate?: Date;
  isbn: string;
  topics?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
