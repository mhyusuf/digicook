import { AuthenticationError } from 'apollo-server-express';
import Collection from '../models/collection';
import Recipe, { IIngredient } from '../models/recipe';
import { IUser } from '../models/user';

export async function createCollection(
  name: string,
  description: string,
  isPrivate: boolean,
  user: IUser,
) {
  if (!user)
    throw new AuthenticationError(
      'you must be logged in to create a collection',
    );
  const collection = await Collection.create({
    name,
    description,
    isPrivate,
    _user: user._id,
    _recipes: [],
  });
  return collection.populate('_user').execPopulate();
}

export async function createRecipe(
  name: string,
  category: string,
  instructions: string,
  ingredients: IIngredient[],
  _collection: string,
  user: IUser,
) {
  if (!user)
    throw new AuthenticationError('you must be logged in to create a recipe');
  const newRecipe = await Recipe.create({
    name,
    category,
    instructions,
    ingredients,
    _collection,
    _user: user._id,
  });
  await Collection.findByIdAndUpdate(_collection, {
    $addToSet: { _recipes: newRecipe._id },
  });
  return newRecipe.populate('_user').execPopulate();
}
