import Express from 'express';
const router = Express.Router();
const requireLogin = require('../middleware/requireLogin');
import uploadService from '../services/imageUpload';

const { upload } = uploadService;
const {
  getCollections,
  getCollectionImage,
  getCollectionDetails,
  postCollection,
  postCollectionImage,
  updateCollection,
  deleteCollection,
} = require('../controllers/collectionController');

router.get('/', getCollections);
router.get('/:id/image', getCollectionImage);
router.get('/:id', getCollectionDetails);
router.post('/', requireLogin, postCollection);
router.post(
  '/:id/image',
  requireLogin,
  upload.single('image'),
  postCollectionImage,
);
router.put('/:id', requireLogin, updateCollection);
router.delete('/:id', requireLogin, deleteCollection);

module.exports = router;
