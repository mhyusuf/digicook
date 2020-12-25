import { Request } from 'express';
import { IUser } from '../../models/user';

export interface RequestWithUserAuth extends Request {
  user?: IUser;
}
