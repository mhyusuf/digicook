import Collection, {ICollection} from '../models/collection';
import Recipe, {IRecipe} from '../models/recipe';
import User, {IUser} from '../models/user';
import { RequestWithQueryParam, RequestWithRecipeInfo, RequestWithUserAuth } from '../interfaces/requests';
import { Schema } from 'mongoose';
import { Request, Response } from 'express';
const { processImage } = require('../services/imageUpload');

// Sends back an array of Recipe objects to client, given a string as req.query.q
exports.getRecipes = async (req: RequestWithQueryParam, res: Response) : Promise<void> => {
  try {
    const q: string = req.query.q;
    // Aggregate is a Mongo method that executes database operations in given order
    const recipes: IRecipe[] = await Recipe.aggregate([
      {
        // In the 'collections' table, populate each repice's collection field with the collection object
        // $lookup also functions as .populate to join related entities
        $lookup: {
          from: 'collections',
          // Local to the recipe object, the field is called _collection
          localField: '_collection',
          // Local to the collection object, the field is called _id
          foreignField: '_id',
          // This is used to reference as an internal variable in the lines below 
          as: '_collection'
        }
      },
      // Turns the single object array into a single object
      { $unwind: { path: '$_collection' } },
      {
        $match: {
          '_collection.isPrivate': false,
          name: { $regex: q || '', $options: 'i' }
        }
      }
    ]);
    // Returns an array of populated Recipe objects
    res.send(recipes);
  } catch (e) {
    res.sendStatus(500);
  }
};

// Given a req.param id, sends back a DB Recipe object to client
exports.getRecipe = async (req: Request, res: Response) : Promise<void> => {
  try {
    const id: string = req.params.id;
    const recipe: IRecipe = await Recipe.findById(id);
    res.send(recipe);
  } catch (e) {
    res.sendStatus(404);
  }
};

// Given a req.params id, sends back a DB Recipe object's image to client
exports.getRecipeImage = async (req: Request, res: Response) : Promise<void> => {
  try {
    const recipe: IRecipe = await Recipe.findById(req.params.id);
    res.set('Content-Type', 'image/png');
    res.send(recipe.image);
  } catch (e) {
    res.sendStatus(404);
  }
};


// Creates and sends back a new Recipe object to client, given the parameters on req.body and req.user
exports.postRecipe = async (req: RequestWithRecipeInfo, res: Response) : Promise<void> => {
  try {
    const { name, category, instructions, image, ingredients, collection } = req.body;
    const recipe = await Recipe.create({
      name,
      category,
      instructions,
      image,
      ingredients,
      _collection: collection,
      _user: req.user._id
    });
    await Collection.findByIdAndUpdate(collection, {
      $addToSet: { _recipes: recipe._id }
    });
    res.status(201).send(recipe);
  } catch (e) {
    res.sendStatus(500);
  }
};

// Finds recipe by ID and adds image property of type Buffer to Recipe object
// Sends status code back to client
exports.postRecipeImage = async (req: RequestWithUserAuth, res: Response) : Promise<void> => {
  try {
    const _id: string = req.params.id;
    const _user: Schema.Types.ObjectId = req.user._id;
    const recipe = await Recipe.findOne({ _id, _user });
    if (!recipe) throw new Error();
    const buffer = await processImage({
      buffer: req.file.buffer,
      width: 360,
      height: 360
    });
    recipe.image = buffer;
    await recipe.save();
    res.send();
  } catch (e) {
    res.sendStatus(400);
  }
};

// Sends back updated Recipe object to client, given req.params id and req.body paramters
exports.updateRecipe = async (req: RequestWithRecipeInfo, res: Response) : Promise<void> => {
  try {
    const id: string = req.params.id;
    const { name, category, instructions, image, ingredients, collection } = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        name,
        category,
        instructions,
        image,
        ingredients,
        collection
      },
      { new: true }
    );
    res.send(updatedRecipe);
  } catch (e) {
    res.sendStatus(404);
  }
};

// Deletes DB Recipe, given req.params id
// Sends back status code to client
exports.deleteRecipe = async (req: Request, res: Response) : Promise<void> => {
  try {
    const id: string = req.params.id;
    const deletedRecipe: IRecipe = await Recipe.findByIdAndDelete(id);
    await Collection.findByIdAndUpdate(deletedRecipe._collection, {
      $pull: { _recipes: deletedRecipe._id }
    });
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(404);
  }
};
