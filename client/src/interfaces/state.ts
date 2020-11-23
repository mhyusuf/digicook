import { Schema } from 'mongoose';
import { IUser, IRecipe, ICollection } from './model';

export interface IState {
  auth?: IUser
  collections?: {
    collectionList?: ICollection[];
    collectionDetail?: ICollection;
    recipeList?: {
      _id: Schema.Types.ObjectId;
    }[];
    recipe?: IRecipe;
  }
  menus?: boolean;
}