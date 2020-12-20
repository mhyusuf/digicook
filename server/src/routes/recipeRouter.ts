import Express from 'express';
const router = Express.Router();
const requireLogin = require('../middleware/requireLogin');
import uploadService from '../services/imageUpload';

const { upload } = uploadService;
const {
  getRecipes,
  getRecipe,
  getRecipeImage,
  postRecipe,
  postRecipeImage,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.get('/:id/image', getRecipeImage);

router.post('/', requireLogin, postRecipe);
router.post(
  '/:id/image',
  requireLogin,
  upload.single('image'),
  postRecipeImage,
);
router.put('/:id', updateRecipe);
router.put('/:id/image', requireLogin, upload.single('image'), postRecipeImage);
router.delete('/:id', deleteRecipe);

module.exports = router;
