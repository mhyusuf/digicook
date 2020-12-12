import { Schema, Document } from 'mongoose';
import { Action } from 'redux';

export interface ICollection extends Document {
  name: string;
  description: string;
  image: Buffer;
  isPrivate: boolean;
}

export interface ICollectionWithUserObj extends ICollection {
  _user: IUser;
}
export interface ICollectionWithUserId extends ICollection {
  _user: Schema.Types.ObjectId;
}
export interface ICollectionWithRecipeObjs extends ICollection {
  _recipes: IRecipe[];
}
export interface ICollectionWithRecipeIds extends ICollection {
  _recipes: Schema.Types.ObjectId[];
}
export interface ICollectionWithOwnId extends ICollection {
  _id: Schema.Types.ObjectId[];
}

export interface CollectionDetailCollection extends ICollectionWithUserId, ICollectionWithRecipeObjs {}
export interface MyCollectionsCollection extends ICollectionWithRecipeIds, ICollectionWithUserObj {}
export interface CollectionListCollection extends ICollectionWithRecipeIds {}

export interface IRecipe extends Document {
  name: string;
  category: string;
  instructions: string;
  image: Buffer;
  ingredients: IIngredient[];
  _collection: Schema.Types.ObjectId | ICollection;
  _user: Schema.Types.ObjectId | IUser;
}

export interface IRecipeWithIds extends IRecipe {
  _id: Schema.Types.ObjectId;
  ingredients: IIngredientWithOwnId[];
}

export interface IIngredient {
  name: string;
  quantity: string;
}

export interface IIngredientWithOwnId extends IIngredient {
  _id: Schema.Types.ObjectId;
}

export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  _id: Schema.Types.ObjectId;
}

export interface DigiCookAction extends Action {
  payload: any;
}
