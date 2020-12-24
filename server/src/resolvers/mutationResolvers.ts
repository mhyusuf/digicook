import { createCollection, createRecipe } from './apiCreate';
import { updateCollection, updateRecipe } from './apiUpdate';
import { deleteCollection, deleteRecipe } from './apiDelete';
import { IUser } from '../models/user';
import { IIngredient } from '../models/recipe';

export const Mutation = {
  createCollection: (
    _: {},
    {
      name,
      description,
      isPrivate,
    }: { name: string; description: string; isPrivate: boolean },
    { user }: { user?: IUser },
  ) => createCollection(name, description, isPrivate, user),
  createRecipe: (
    _: {},
    {
      name,
      category,
      instructions,
      ingredients,
      _collection,
    }: {
      name: string;
      category: string;
      instructions: string;
      ingredients: IIngredient[];
      _collection: string;
    },
    { user }: { user?: IUser },
  ) =>
    createRecipe(name, category, instructions, ingredients, _collection, user),
  updateCollection: (
    _: {},
    {
      _id,
      name,
      description,
      isPrivate,
    }: { _id: string; name: string; description: string; isPrivate: boolean },
    { user }: { user?: IUser },
  ) => updateCollection(_id, name, description, isPrivate, user),
  updateRecipe: (
    _: {},
    {
      _id,
      name,
      category,
      instructions,
      ingredients,
    }: {
      _id: string;
      name: string;
      category: string;
      instructions: string;
      ingredients: IIngredient[];
    },
    { user }: { user?: IUser },
  ) => updateRecipe(_id, name, category, instructions, ingredients, user),
  deleteCollection: (
    _: {},
    { _id }: { _id: string },
    { user }: { user?: IUser },
  ) => deleteCollection(_id, user),
  deleteRecipe: (_: {}, { _id }: { _id: string }, { user }: { user?: IUser }) =>
    deleteRecipe(_id, user),
};
