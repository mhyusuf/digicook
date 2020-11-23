import { Schema } from 'mongoose';
import { IUser, IRecipe, ICollectionWithUserObj, ICollectionWithUserId } from './model';

export interface IState {
  auth?: IUser
  collections?: {
    collectionList?: ICollectionWithUserId[] | ICollectionWithUserObj[];
    collectionDetail?: ICollectionWithUserId | ICollectionWithUserObj;
    recipeList?: {
      _id: Schema.Types.ObjectId;
    }[];
    recipe?: IRecipe;
  }
  menus?: boolean;
}