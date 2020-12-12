import { Request } from 'express';
import { Schema } from 'mongoose';
import { IUser } from '../../models/user';

export interface RequestWithUserAuth extends Request {
  user?: IUser;
}

export interface RequestWithQueryParam extends Request {
  query: {
    q?: string;
  };
}

export interface RequestWithCollectionInfo extends RequestWithUserAuth {
  body: {
    name: string;
    description: string;
    isPrivate: boolean;
  };
}

export interface RequestWithRecipeInfo extends RequestWithUserAuth {
  body: {
    name: string;
    category: string;
    instructions: string;
    image: Buffer;
    ingredients: { name: string; quantity: string }[];
    collection: string;
  };
}
