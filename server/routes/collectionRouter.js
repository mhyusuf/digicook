const router = require('express').Router();

const requireLogin = require('../middleware/requireLogin');
const { upload } = require('../services/imageUpload');
const {
  getCollections,
  postCollection,
  postCollectionImage,
  updateCollection,
  deleteCollection
} = require('../controllers/collectionController');

router.get('/', getCollections);
router.post('/', requireLogin, postCollection);
router.post('/:id/image', upload.single('image'), postCollectionImage);
router.put('/:id', requireLogin, updateCollection);
router.delete('/:id', requireLogin, deleteCollection);

module.exports = router;
