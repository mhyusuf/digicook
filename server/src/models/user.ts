import { Schema, Document, model, Types } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
}

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
});

userSchema.virtual('collections', {
  ref: 'Collection',
  localField: '_id',
  foreignField: '_user',
});

export default model<IUser>('User', userSchema);
