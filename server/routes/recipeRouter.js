const router = require('express').Router();

const {
  getRecipes,
  postRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');

router.get('/', getRecipes);
router.post('/', postRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
