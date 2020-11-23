import Express from 'express';
const router = Express.Router(); // Accesses Express router
const requireLogin = require('../middleware/requireLogin'); // Import middlewear to validate logged in user
const { upload } = require('../services/imageUpload'); // Import image upload function

// Import collection controller functions
const {
  getCollections,
  getCollectionImage,
  getCollectionDetails,
  postCollection,
  postCollectionImage,
  updateCollection,
  deleteCollection
} = require('../controllers/collectionController');

// Set up paths with corresponding callback functions
router.get('/', getCollections);
router.get('/:id/image', getCollectionImage);
router.get('/:id', getCollectionDetails);

// Require users to be logged in to access routes below
router.post('/', requireLogin, postCollection); 
router.post('/:id/image', requireLogin, upload.single('image'), postCollectionImage); 
router.put('/:id', requireLogin, updateCollection);
router.delete('/:id', requireLogin, deleteCollection);

module.exports = router;
