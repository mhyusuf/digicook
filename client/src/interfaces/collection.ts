import { Document, Types } from 'mongoose';

import { User } from './user';

export interface Collection extends Document {
  name: string;
  description: string;
  isPrivate: boolean;
  _user: User;
  _recipes: Types.ObjectId[];
}
