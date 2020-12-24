import { Schema, model, Document, Types } from 'mongoose'; // Import mongoose schema class

export interface IRecipe extends Document {
  name: string;
  category: string;
  instructions: string;
  image?: Buffer;
  ingredients: IIngredient[];
  _collection: Types.ObjectId;
  _user: Types.ObjectId;
}

export interface IIngredient {
  name: string;
  quantity: string;
}

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
    },
    ingredients: {
      type: [{ name: String, quantity: String }],
      required: true,
    },
    _collection: {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
    },
    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export default model<IRecipe>('Recipe', recipeSchema); // Export model
