import { Schema, model, Document } from 'mongoose'; // Import mongoose schema class

// Create new recipie schema

export interface IRecipe extends Document {
  name: string,
  category: string,
  instructions: string,
  image: Buffer,
  ingredients: {name: string, quantity: string}[],
  _collection: Schema.Types.ObjectId,
  _user: Schema.Types.ObjectId,
}

export interface IRecipeWithId extends IRecipe {
  _id: Schema.Types.ObjectId,
}

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    image: {
      type: Buffer // Store buffer stream of bytes
    },
    ingredients: {
      type: [{ name: String, quantity: String }],
      required: true
    },
    _collection: {
      type: Schema.Types.ObjectId,
      ref: 'Collection'
    },
    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true // Add created at / updated at properties to document
  }
);

export default model<IRecipe>('Recipe', recipeSchema); // Export model
