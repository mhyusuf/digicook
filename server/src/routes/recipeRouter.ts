import { Router } from 'express';

import requireLogin from '../middleware/requireLogin';
import { upload } from '../services/imageUpload';
import {
  getRecipeImage,
  postRecipeImage,
} from '../controllers/recipeController';

const router = Router();

router.get('/:id/image', getRecipeImage);
router.post(
  '/:id/image',
  requireLogin,
  upload.single('image'),
  postRecipeImage,
);

export default router;
