import { Schema } from 'mongoose';
import { IUser, IRecipe, ICollection } from './model';

export interface IState {
  auth?: IUser
  collections: {
    collectionList: ICollection[] | ICollection[];
    collectionDetail: ICollection | ICollection;
    recipeList: {
      _id: Schema.Types.ObjectId;
    }[];
    recipe: IRecipe;
  }
  menus: boolean;
}