var router = require('express').Router(); // Accesses Express router
var requireLogin = require('../middleware/requireLogin'); // Import middleware to validate logged in user
var upload = require('../services/imageUpload').upload; // Import image upload function
// Import collection controller functions
var _a = require('../controllers/recipeController'), getRecipes = _a.getRecipes, getRecipe = _a.getRecipe, getRecipeImage = _a.getRecipeImage, postRecipe = _a.postRecipe, postRecipeImage = _a.postRecipeImage, updateRecipe = _a.updateRecipe, deleteRecipe = _a.deleteRecipe;
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
