import { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  name: string,
  description: string,
  image: Buffer,
  isPrivate: boolean,
}

export interface ICollectionWithUserObj extends ICollection {
  _user: IUser;
}
export interface ICollectionWithUserId extends ICollection {
  _user: Schema.Types.ObjectId;
}
export interface ICollectionWithRecipeObjs extends ICollection {
  _recipes: IRecipe[]
}
export interface ICollectionWithRecipeIds extends ICollection {
  _recipes: Schema.Types.ObjectId[]
}

export interface CollectionDetailCollection extends ICollectionWithUserId, ICollectionWithRecipeObjs{};
export interface MyCollectionsCollection extends ICollectionWithRecipeIds, ICollectionWithUserObj{};


export interface IRecipe extends Document {
  name: string,
  category: string,
  instructions: string,
  image: Buffer,
  ingredients: IIngredient[],
  _collection: Schema.Types.ObjectId | ICollection,
  _user: Schema.Types.ObjectId | IUser,
}

export interface IIngredient {
  name: string,
  quantity: string
}

export interface IUser extends Document {
  googleId: string,
  name: string,
  email: string,
  _id: Schema.Types.ObjectId,
}