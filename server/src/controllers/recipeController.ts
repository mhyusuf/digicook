import { Types } from 'mongoose';
import Recipe, { IRecipe } from '../models/recipe';
import { RequestWithUserAuth } from '../interfaces/requests';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

import { processImage } from '../services/imageUpload';

export async function getRecipeImage(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const recipe: IRecipe = await Recipe.findById(req.params.id);
    res.set('Content-Type', 'image/png');
    res.send(recipe.image);
  } catch (e) {
    res.sendStatus(404);
  }
}

export async function postRecipeImage(
  req: RequestWithUserAuth,
  res: Response,
): Promise<void> {
  try {
    const idStr: string = req.params.id;
    const _user: Types.ObjectId = req.user._id;
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
}
