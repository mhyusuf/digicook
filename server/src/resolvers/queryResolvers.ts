import {
  getPublicCollections,
  getPublicRecipes,
  getUserCollections,
  getCollectionById,
  getRecipesByCollection,
  getRecipeDetail,
} from './apiRead';
import { IUser } from '../models/user';

export const Query = {
  getPublicCollections: (_: {}, { query }: { query?: string }) =>
    getPublicCollections(query),
  getPublicRecipes: (_: {}, { query }: { query?: string }) =>
    getPublicRecipes(query),
  getUserCollections: (
    _: {},
    { query }: { query?: string },
    { user }: { user?: IUser },
  ) => getUserCollections(user),
  getCollectionById: (_: {}, { _id }: { _id: string }) =>
    getCollectionById(_id),
  getRecipesByCollection: (
    _: {},
    { _collection, query }: { _collection: string; query: string },
  ) => getRecipesByCollection(_collection, query),
  getRecipeDetail: (_: {}, { _id }: { _id: string }) => getRecipeDetail(_id),
};
