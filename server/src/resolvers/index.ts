import { Query } from './queryResolvers';
import { User } from './userResovers';
import { Recipe } from './recipeResolvers';
import { Ingredient } from './ingredientResolvers';
import { Mutation } from './mutationResolvers';

const resolvers = {
  Query,
  User,
  Recipe,
  Ingredient,
  Mutation,
};

export default resolvers;
