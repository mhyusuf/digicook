"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router(); // Accesses Express router
var requireLogin = require('../middleware/requireLogin'); // Import middlewear to validate logged in user
var upload = require('../services/imageUpload').upload; // Import image upload function
// Import collection controller functions
var _a = require('../controllers/collectionController'), getCollections = _a.getCollections, getCollectionImage = _a.getCollectionImage, getCollectionDetails = _a.getCollectionDetails, postCollection = _a.postCollection, postCollectionImage = _a.postCollectionImage, updateCollection = _a.updateCollection, deleteCollection = _a.deleteCollection;
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
