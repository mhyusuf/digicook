import mongoose from 'mongoose';
import { IIngredient } from './model'

export interface ICollectionValues {
  name?: string;
  description?: string;
  isPrivate: boolean;
  imageData?: FormData;
  image?: any;
}

export interface IRecipeValues {
  name?: string;
  category?: string;
  instructions?: string;
  imageData?: FormData;
  ingredients?: IIngredient[]
  collection?: string;
  image?: any;
}