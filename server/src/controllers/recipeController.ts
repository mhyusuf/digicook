import Collection, { ICollection } from '../models/collection';
import Recipe, { IRecipe } from '../models/recipe';
import User, { IUser } from '../models/user';
import {
  RequestWithQueryParam,
  RequestWithRecipeInfo,
  RequestWithUserAuth,
} from '../interfaces/requests';
import mongoose, { Schema } from 'mongoose';
import { Request, Response } from 'express';

import imgService from '../services/imageUpload';
const { processImage } = imgService;

exports.getRecipes = async (
  req: RequestWithQueryParam,
  res: Response,
): Promise<void> => {
  try {
    const q: string = req.query.q;
    const recipes: IRecipe[] = await Recipe.aggregate([
      {
        $lookup: {
          from: 'collections',
          localField: '_collection',
          foreignField: '_id',
          as: '_collection',
        },
      },
      { $unwind: { path: '$_collection' } },
      {
        $match: {
          '_collection.isPrivate': false,
          name: { $regex: q || '', $options: 'i' },
        },
      },
    ]);
    res.send(recipes);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.getRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const recipe: IRecipe = await Recipe.findById(id);
    res.send(recipe);
  } catch (e) {
    res.sendStatus(404);
  }
};

exports.getRecipeImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe: IRecipe = await Recipe.findById(req.params.id);
    res.set('Content-Type', 'image/png');
    res.send(recipe.image);
  } catch (e) {
    res.sendStatus(404);
  }
};

exports.postRecipe = async (
  req: RequestWithRecipeInfo,
  res: Response,
): Promise<void> => {
  try {
    const {
      name,
      category,
      instructions,
      image,
      ingredients,
      collection,
    } = req.body;
    const collectionObj = await Collection.findById(collection);
    const recipe = await Recipe.create({
      name,
      category,
      instructions,
      image,
      ingredients,
      _collection: collectionObj._id,
      _user: req.user._id,
    });
    await Collection.findByIdAndUpdate(collection, {
      $addToSet: { _recipes: recipe._id },
    });
    res.status(201).send(recipe);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.postRecipeImage = async (
  req: RequestWithUserAuth,
  res: Response,
): Promise<void> => {
  try {
    const idStr: string = req.params.id;
    const _user: Schema.Types.ObjectId = req.user._id;
    const recipe = await Recipe.findOne({
      _id: mongoose.Types.ObjectId(idStr),
      _user,
    });
    if (!recipe) throw new Error();
    const buffer = await processImage({
      buffer: req.file.buffer,
      width: 360,
      height: 360,
    });
    recipe.image = buffer;
    await recipe.save();
    res.send();
  } catch (e) {
    res.status(400);
    res.send(e.message);
  }
};

exports.updateRecipe = async (
  req: RequestWithRecipeInfo,
  res: Response,
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const {
      name,
      category,
      instructions,
      image,
      ingredients,
      collection,
    } = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        name,
        category,
        instructions,
        image,
        ingredients,
        collection,
      },
      { new: true },
    );
    res.send(updatedRecipe);
  } catch (e) {
    res.status(404);
    res.send(e.message);
  }
};

exports.deleteRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const deletedRecipe: IRecipe = await Recipe.findByIdAndDelete(id);
    await Collection.findByIdAndUpdate(deletedRecipe._collection, {
      $pull: { _recipes: deletedRecipe._id },
    });
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(404);
  }
};
