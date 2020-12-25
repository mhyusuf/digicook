import { Ingredient } from './recipe';

export interface RecipeFormState {
  name: string;
  category: string;
  image: any;
  ingredients: Ingredient[];
  instructions: string;
}

export interface CollectionFormState {
  name: string;
  description: string;
  image: any;
  isPrivate: boolean;
}
