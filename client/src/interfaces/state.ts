import { Schema } from 'mongoose';
import { IUser, IRecipe, ICollection, CollectionDetailCollection} from './model';

export interface IState {
  auth: IUser
  collections: {
    collectionList: ICollection[];
    collectionDetail: CollectionDetailCollection;
    recipeList: {
      _id: Schema.Types.ObjectId;
    }[];
    recipe: IRecipe;
  }
  menus: boolean;
}