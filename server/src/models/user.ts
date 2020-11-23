import { Schema, Document, model } from 'mongoose'; // Import mongoose schema class

export interface IUser extends Document {
  googleId: string,
  name: string,
  email: string
}

// Create new user schema
const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String
});

userSchema.virtual('collections', {
  ref: 'Collection',
  localField: '_id',
  foreignField: '_user'
});

export default model<IUser>('User', userSchema); // Export model
