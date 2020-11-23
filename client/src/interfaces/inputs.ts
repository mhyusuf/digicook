export interface ICollectionValues {
  name?: string;
  description?: string;
  isPrivate?: boolean;
  imageData?: FormData;
}

export interface IRecipeValues {
  name?: string;
  category?: string;
  instructions?: string;
  imageData?: FormData;
  ingredients?: {
    name: string;
    quantity: string;
  }[]
  collection?: string
}