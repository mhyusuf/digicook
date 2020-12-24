import { Types } from 'mongoose';
import Collection from '../models/collection';
import Recipe, { IRecipe } from '../models/recipe';
import { IUser } from '../models/user';

export function getPublicCollections(query: string) {
  const searchString = new RegExp(query || '', 'i');
  return Collection.find({
    name: searchString,
    isPrivate: false,
  }).populate('_user');
}

export function getPublicRecipes(query: string) {
  const searchString = new RegExp(query || '', 'i');
  return Recipe.aggregate<IRecipe>([
    {
      $lookup: {
        from: 'collections',
        localField: '_collection',
        foreignField: '_id',
        as: '_collection',
      },
    },
    { $unwind: { path: '$_collection' } },
    {
      $match: {
        '_collection.isPrivate': false,
        name: searchString,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_user',
        foreignField: '_id',
        as: '_user',
      },
    },
    { $unwind: { path: '$_user' } },
  ]);
}

export function getUserCollections(user: IUser) {
  return Collection.find({ _user: user._id }).populate('_user');
}

export function getCollectionById(_id: string) {
  return Collection.findById(_id).populate('_user');
}

export function getRecipesByCollection(_collectionId: string, query: string) {
  const searchString = new RegExp(query || '', 'i');
  return Recipe.find({
    _collection: new Types.ObjectId(_collectionId),
    name: searchString,
  }).populate('_user');
}

export function getRecipeDetail(_id: string) {
  return Recipe.findById(_id).populate('_user');
}
