import { Ingredient } from './recipe';

export interface CollectionValues {
  name: string;
  description: string;
  isPrivate: boolean;
  imageData: FormData;
  image?: any;
}

export interface RecipeValues {
  name: string;
  category: string;
  instructions: string;
  imageData: FormData;
  ingredients: Ingredient[];
  collection: string;
  image?: any;
}
