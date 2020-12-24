import { Document, Types } from 'mongoose';

import { User } from './user';

interface Ingredient {
  name: string;
  quantity: string;
}

export interface Recipe extends Document {
  name: string;
  category: string;
  instructions: string;
  ingredients: Ingredient[];
  _collection: Types.ObjectId;
  _user: User;
}
