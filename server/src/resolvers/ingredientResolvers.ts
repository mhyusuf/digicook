import { IIngredient } from '../models/recipe';

export const Ingredient = {
  name: (obj: IIngredient) => obj.name,
  quantity: (obj: IIngredient) => obj.quantity,
};
