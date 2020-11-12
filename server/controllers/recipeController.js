const Recipe = require('../models/recipe');

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (e) {
    res.sendStatus(500);
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
      collection
    });
    res.status(201).send(recipe);
  } catch (e) {
    res.sendStatus(500);
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
