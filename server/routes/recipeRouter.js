const router = require('express').Router();

const requireLogin = require('../middleware/requireLogin');
const { upload } = require('../services/imageUpload');

const {
  getRecipes,
  getRecipeImage,
  postRecipe,
  postRecipeImage,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');

router.get('/', getRecipes);
router.get('/:id/image', getRecipeImage);
router.post('/', requireLogin, postRecipe);
router.post('/:id/image', requireLogin, upload.single('image'), postRecipeImage);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
