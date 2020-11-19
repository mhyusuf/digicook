
const router = require('express').Router(); // Accesses Express router
const requireLogin = require('../middleware/requireLogin'); // Import middleware to validate logged in user
const { upload } = require('../services/imageUpload'); // Import image upload function

// Import collection controller functions
const {
  getRecipes,
  getRecipe,
  getRecipeImage,
  postRecipe,
  postRecipeImage,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');

// Set up paths with corresponding callback functions
router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.get('/:id/image', getRecipeImage);

// Require users to be logged in to access routes below
router.post('/', requireLogin, postRecipe);
router.post('/:id/image', requireLogin, upload.single('image'), postRecipeImage);
router.put('/:id', updateRecipe);
router.put('/:id/image', requireLogin, upload.single('image'), postRecipeImage);
router.delete('/:id', deleteRecipe);

module.exports = router;
