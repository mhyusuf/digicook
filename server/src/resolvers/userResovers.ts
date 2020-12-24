import { IUser } from '../models/user';

export const User = {
  _id: (obj: IUser) => obj._id,
  googleId: (obj: IUser) => obj.googleId,
  email: (obj: IUser) => obj.email,
};
