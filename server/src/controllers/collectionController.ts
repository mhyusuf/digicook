import { Request, Response } from 'express';
import { Schema, Types } from 'mongoose';
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

// Sends back collections to client from following parameters on req object:
// q (search query string), user (_user mongo string), pub (Boolean, if public/private)
exports.getCollections = async (req: Request, res: Response): Promise<void> => {
  try {
    const matchObj: {
      _user?: any;
      isPrivate?: boolean;
      name?: { $regex: string; $options: string };
    } = {};
    const { q, user, pub }: ParsedQs = req.query;
    // If a user is logged in, assign it to the match obj -
    if (user) matchObj._user = Types.ObjectId(req.query.user.toString());
    if (pub === 'true') matchObj.isPrivate = false;
    // If a query string is provided, filter by passing it as RegEx, case-insensitive
    if (q) {
      const nameStr = {
        $regex: q.toString(),
        $options: 'i',
      };
      matchObj.name = nameStr;
    }

    // Assign and return matching collections,
    // replacing the _user string id with the full user obj
    const collections: ICollection[] = await Collection.find(matchObj).populate(
      '_user',
    );
    res.send(collections);
  } catch (e) {
    res.sendStatus(500);
  }
};

// Sends back png image to client of type Buffer given an id in the URL
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

// Sends back a single collection to client, with recipe objs in place of their _id references
// Accepts a URL param of id, and a query param of q
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

// Creates and sends back a new collection to client, given a name, description and isPrivate boolean
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

// Sends back status code to client, given url param id and user object on request object
exports.postCollectionImage = async (
  req: RequestWithUserAuth,
  res: Response,
): Promise<void> => {
  try {
    const _id: string = req.params.id;
    const reqUser: IUser = req.user;
    const _user: Schema.Types.ObjectId = reqUser._id;
    const collection: ICollection = await Collection.findOne({ _id, _user });
    if (!collection) throw new Error();
    // The following function comes from '../services/imageUpload'
    const buffer = await processImage({
      buffer: req.file.buffer,
      width: 360,
      height: 360,
    });
    // Save the image buffer to the DB collection object and save
    collection.image = buffer;
    await collection.save();
    res.send();
  } catch (e) {
    res.sendStatus(400);
  }
};

// Sends back updated collection to client, given req.params id and req.body name and description
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

// Sends back status code to client, given req.params id
exports.deleteCollection = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCollection: ICollection = await Collection.findByIdAndDelete(
      id,
    );
    // Deletes all recipes related to the collection (cascade)
    await Recipe.deleteMany({ _collection: deletedCollection._id });
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(404);
  }
};
