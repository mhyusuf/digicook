import {
  getPublicCollections,
  getPublicRecipes,
  getUserCollections,
  getCollectionById,
  getRecipesByCollection,
  getRecipeDetail,
} from './apiService';
import { IUser } from '../models/user';

const resolvers = {
  Query: {
    getPublicCollections: (_: any, { query }: { query?: string }) =>
      getPublicCollections(query),
    getPublicRecipes: (_: any, { query }: { query?: string }) =>
      getPublicRecipes(query),
    getUserCollections: (_: any, __: {}, { user }: { user?: IUser }) =>
      getUserCollections(user),
    getCollectionById: (_: any, { _id }: { _id: string }) =>
      getCollectionById(_id),
    getRecipesByCollection: (
      _: any,
      { _collection, query }: { _collection: string; query: string },
    ) => getRecipesByCollection(_collection, query),
    getRecipeDetail: (_: any, { _id }: { _id: string }) => getRecipeDetail(_id),
  },
};

export default resolvers;
