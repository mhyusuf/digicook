import { AuthenticationError } from 'apollo-server-express';
import Collection from '../models/collection';
import { IUser } from '../models/user';
import Recipe from '../models/recipe';
import { IIngredient } from '../models/recipe';

export async function updateCollection(
  _id: string,
  name: string,
  description: string,
  isPrivate: boolean,
  user: IUser,
) {
  if (!user)
    throw new AuthenticationError('you must be logged in to edit a collection');
  return Collection.findByIdAndUpdate(
    _id,
    {
      name,
      description,
      isPrivate,
    },
    {
      new: true,
    },
  ).populate('_user');
}

export async function updateRecipe(
  _id: string,
  name: string,
  category: string,
  instructions: string,
  ingredients: IIngredient[],
  user: IUser,
) {
  if (!user)
    throw new AuthenticationError('you must be logged in to edit a recipe');
  return Recipe.findOneAndUpdate(
    { _id, _user: user._id },
    {
      name,
      category,
      instructions,
      ingredients,
    },
    { new: true },
  ).populate('_user');
}
