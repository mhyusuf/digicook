import { Router } from 'express';

import requireLogin from '../middleware/requireLogin';
import { upload } from '../services/imageUpload';
import {
  getCollectionImage,
  postCollectionImage,
} from '../controllers/collectionController';

const router = Router();

router.get('/:id/image', getCollectionImage);
router.post(
  '/:id/image',
  requireLogin,
  upload.single('image'),
  postCollectionImage,
);

export default router;
