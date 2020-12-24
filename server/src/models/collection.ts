import { Schema, model, Document, Types } from 'mongoose';

export interface ICollection extends Document {
  name: string;
  description: string;
  image?: Buffer;
  isPrivate: boolean;
  _user: Types.ObjectId;
  _recipes: Types.ObjectId[];
}

const collectionSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  _recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
});

collectionSchema.index({ name: 'text', description: 'text' });

export default model<ICollection>('Collection', collectionSchema); // Export model
