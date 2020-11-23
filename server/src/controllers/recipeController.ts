import Collection from '../models/collection';
import Recipe from '../models/recipe';
const { processImage } = require('../services/imageUpload');


// Sends back an array of Recipe objects to client, given a string as req.query.q
exports.getRecipes = async (req, res) => {
  try {
    const { q } = req.query;
    // Aggregate is a Mongo method that executes database operations in given order
    const recipes = await Recipe.aggregate([
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
exports.getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.send(recipe);
  } catch (e) {
    res.sendStatus(404);
  }
};

// Given a req.params id, sends back a DB Recipe object's image to client
exports.getRecipeImage = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.set('Content-Type', 'image/png');
    res.send(recipe.image);
  } catch (e) {
    res.sendStatus(404);
  }
};

// Creates and sends back a new Recipe object to client, given the parameters on req.body and req.user
exports.postRecipe = async (req, res) => {
  try {
    const { name, category, instructions, image, ingredients, collection } = req.body;
    const recipe = await Recipe.create({
      name,
      category,
      instructions,
      image,
      ingredients,
      _collection: collection,
      _user: req.user
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
exports.postRecipeImage = async (req, res) => {
  try {
    const _id = req.params.id;
    const _user = req.user._id;
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
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
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
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    await Collection.findByIdAndUpdate(deletedRecipe._collection, {
      $pull: { _recipes: deletedRecipe._id }
    });
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(404);
  }
};
