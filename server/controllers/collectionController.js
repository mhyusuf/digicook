const Collection = require('../models/collection');
const Recipe = require('../models/recipe');
const { processImage } = require('../services/imageUpload');

exports.getCollections = async (req, res) => {
  // query all collections
  // query collections for a single user
  try {
    const match = {};
    if (req.query.user) match._user = req.query.user;
    const collections = await Collection.find(match).populate('_user');
    res.send(collections);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.getCollectionImage = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    res.set('Content-Type', 'image/png');
    res.send(collection.image);
  } catch (e) {
    res.sendStatus(404);
  }
};

exports.getCollectionDetails = async (req, res) => {
  try {
    const _id = req.params.id;
    const collection = await Collection.findById(_id).populate('_recipes');
    res.send(collection);
  } catch (e) {
    res.sendStatus(404);
  }
};

exports.postCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    const collection = await Collection.create({ name, _user: req.user, description });
    res.status(201).send(collection);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.postCollectionImage = async (req, res) => {
  try {
    const _id = req.params.id;
    const _user = req.user._id;
    const collection = await Collection.findOne({ _id, _user });
    if (!collection) throw new Error();
    const buffer = await processImage({
      buffer: req.file.buffer,
      width: 360,
      height: 360
    });
    collection.image = buffer;
    await collection.save();
    res.send();
  } catch (e) {
    res.sendStatus(400);
  }
};

exports.updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      {
        name,
        description
      },
      { new: true }
    );
    res.send(updatedCollection);
  } catch (e) {
    res.sendStatus(404);
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCollection = await Collection.findByIdAndDelete(id);
    await Recipe.deleteMany({ _collection: deletedCollection._id });
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(404);
  }
};
