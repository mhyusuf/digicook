const Recipe = require('../models/recipe');
const { processImage } = require('../services/imageUpload');

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (e) {
    res.sendStatus(500);
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
    await Recipe.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(404);
  }
};
