import { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  name: string,
  description: string,
  image: Buffer,
  isPrivate: boolean,
  _recipes: Schema.Types.ObjectId[]
}

export interface ICollectionWithUserObj extends ICollection {
  _user: IUser;
}
export interface ICollectionWithUserId extends ICollection {
  _user: Schema.Types.ObjectId;
}

export interface IRecipe extends Document {
  name: string,
  category: string,
  instructions: string,
  image: Buffer,
  ingredients: {name: string, quantity: string}[],
  _collection: Schema.Types.ObjectId | ICollection,
  _user: Schema.Types.ObjectId | IUser,
}

export interface IUser extends Document {
  googleId: string,
  name: string,
  email: string,
  _id: Schema.Types.ObjectId,
}