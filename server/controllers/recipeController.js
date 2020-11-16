const Recipe = require('../models/recipe');
const Collection = require('../models/collection');
const { processImage } = require('../services/imageUpload');

exports.getRecipes = async (req, res) => {
  try {
    // const { pub } = req.query;
    // const match = {};
    // if (pub === 'true') match.isPrivate = false;
    const recipes = await Recipe.aggregate([
      {
        $lookup: {
          from: 'collections',
          localField: '_collection',
          foreignField: '_id',
          as: '_collection'
        }
      },
      { $unwind: { path: '$_collection' } },
      { $match: { '_collection.isPrivate': false } }
    ]);
    res.send(recipes);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.send(recipe);
  } catch (e) {
    res.sendStatus(404);
  }
};

exports.getRecipeImage = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.set('Content-Type', 'image/png');
    res.send(recipe.image);
  } catch (e) {
    res.sendStatus(404);
  }
};

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
