import { Request, Response } from 'express';
import { Types } from 'mongoose';
import Collection, { ICollection } from '../models/collection';
import { RequestWithUserAuth } from '../interfaces/requests';
import { IUser } from '../models/user';

import { processImage } from '../services/imageUpload';

export async function getCollectionImage(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const collection: ICollection = await Collection.findById(req.params.id);
    res.set('Content-Type', 'image/png');
    res.send(collection.image);
  } catch (e) {
    res.sendStatus(404);
  }
}

export async function postCollectionImage(
  req: RequestWithUserAuth,
  res: Response,
): Promise<void> {
  try {
    const _id: string = req.params.id;
    const reqUser: IUser = req.user;
    const _user: Types.ObjectId = reqUser._id;
    const collection: ICollection = await Collection.findOne({ _id, _user });
    if (!collection) throw new Error();
    const buffer = await processImage({
      buffer: req.file.buffer,
      width: 360,
      height: 360,
    });
    collection.image = buffer;
    await collection.save();
    res.send();
  } catch (e) {
    res.sendStatus(400);
  }
}
