import { Document } from 'mongoose';

export interface Topic extends Document {
  name: string;
  description?: string;
  updatedAt?: Date;
}
