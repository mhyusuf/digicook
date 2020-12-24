import { AuthenticationError } from 'apollo-server-express';
import Collection from '../models/collection';
import Recipe from '../models/recipe';
import { IUser } from '../models/user';

export async function deleteCollection(_id: string, user: IUser) {
  if (!user)
    throw new AuthenticationError(
      'you must be logged in to delete a collection',
    );
  await Recipe.deleteMany({ _collection: _id });
  return Collection.findOneAndDelete({ _id, _user: user._id }).populate(
    '_user',
  );
}

export function deleteRecipe(_id: string, user: IUser) {
  if (!user)
    throw new AuthenticationError('you must be logged in to delete a recipe');
  return Recipe.findOneAndDelete({ _id, _user: user._id }).populate('_user');
}
