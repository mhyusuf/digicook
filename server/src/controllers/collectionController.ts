import { Request, Response } from 'express';
import { Types } from 'mongoose';
import Collection, { ICollection } from '../models/collection';
import {
  RequestWithQueryParam,
  RequestWithCollectionInfo,
  RequestWithUserAuth,
} from '../interfaces/requests';
import Recipe from '../models/recipe';
import { IUser } from '../models/user';
import { ParsedQs } from 'qs';

import imgService from '../services/imageUpload';
const { processImage } = imgService;

exports.getCollections = async (req: Request, res: Response): Promise<void> => {
  try {
    const matchObj: {
      _user?: any;
      isPrivate?: boolean;
      name?: { $regex: string; $options: string };
    } = {};
    const { q, user, pub }: ParsedQs = req.query;
    if (user) matchObj._user = Types.ObjectId(req.query.user.toString());
    if (pub === 'true') matchObj.isPrivate = false;
    if (q) {
      const nameStr = {
        $regex: q.toString(),
        $options: 'i',
      };
      matchObj.name = nameStr;
    }

    const collections: ICollection[] = await Collection.find(matchObj).populate(
      '_user',
    );
    res.send(collections);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.getCollectionImage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const collection: ICollection = await Collection.findById(req.params.id);
    res.set('Content-Type', 'image/png');
    res.send(collection.image);
  } catch (e) {
    res.sendStatus(404);
  }
};

exports.getCollectionDetails = async (
  req: RequestWithQueryParam,
  res: Response,
): Promise<void> => {
  try {
    const matchObj: { name?: { $regex: string; $options: string } } = {};
    const q: string = req.query.q;
    if (q) {
      matchObj.name = {
        $regex: q,
        $options: 'i',
      };
    }
    const _id = req.params.id;
    const collection: ICollection = await Collection.findById(_id)
      .populate({
        path: '_recipes',
        matchObj,
      })
      .exec();
    res.send(collection);
  } catch (e) {
    res.sendStatus(404);
  }
};

exports.postCollection = async (
  req: RequestWithCollectionInfo,
  res: Response,
): Promise<void> => {
  try {
    const { name, description, isPrivate } = req.body;
    const user: IUser = req.user;
    const collection: ICollection = await Collection.create({
      name,
      description,
      image: Buffer.from([]),
      isPrivate,
      _user: user._id,
      _recipes: [],
    });
    res.status(201).send(collection);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.postCollectionImage = async (
  req: RequestWithUserAuth,
  res: Response,
): Promise<void> => {
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
};

exports.updateCollection = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedCollection: ICollection = await Collection.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true },
    );
    res.send(updatedCollection);
  } catch (e) {
    res.sendStatus(404);
  }
};

exports.deleteCollection = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCollection: ICollection = await Collection.findByIdAndDelete(
      id,
    );
    await Recipe.deleteMany({ _collection: deletedCollection._id });
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(404);
  }
};
