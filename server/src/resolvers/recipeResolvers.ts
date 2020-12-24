import { IRecipe } from '../models/recipe';

export const Recipe = {
  _collection: (obj: IRecipe) => obj._collection.toHexString(),
};
