const Collection = require('../models/collection');
const Recipe = require('../models/recipe');
const { processImage } = require('../services/imageUpload');

// Sends back collections to client from following parameters on req object:
// q (search query string), user (_user mongo string), pub (Boolean, if public/private)
exports.getCollections = async (req, res) => {
  try {
    const match = {};
    const { q, user, pub } = req.query;
    // If a user is logged in, assign it to the match obj
    if (user) match._user = req.query.user;
    if (pub === 'true') match.isPrivate = false;
    // If a query string is provided, filter by passing it as RegEx, case-insensitive
    if (q) {
      match.name = {
        $regex: q,
        $options: 'i'
      };
    }
    // Assign and return matching collections,
    // replacing the _user string id with the full user obj
    const collections = await Collection.find(match).populate('_user');
    res.send(collections);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

// Sends back png image to client of type Buffer given an id in the URL
exports.getCollectionImage = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    res.set('Content-Type', 'image/png');
    res.send(collection.image);
  } catch (e) {
    res.sendStatus(404);
  }
};

// Sends back a single collection to client, with recipe objs in place of their _id references
// Accepts a URL param of id, and a query param of q
exports.getCollectionDetails = async (req, res) => {
  try {
    const match = {};
    const { q } = req.query;
    if (q) {
      match.name = {
        $regex: q,
        $options: 'i'
      };
    }
    const _id = req.params.id;
    const collection = await Collection.findById(_id)
      .populate({
        path: '_recipes',
        match
      })
      .exec();
    res.send(collection);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(404);
  }
};

// Creates and sends back a new collection to client, given a name, description and isPrivate boolean
exports.postCollection = async (req, res) => {
  try {
    const { name, description, isPrivate } = req.body;
    const collection = await Collection.create({
      name,
      _user: req.user,
      description,
      isPrivate
    });
    res.status(201).send(collection);
  } catch (e) {
    res.sendStatus(500);
  }
};

// Sends back status code to client, given url param id and user object on request object
exports.postCollectionImage = async (req, res) => {
  try {
    const _id = req.params.id;
    const _user = req.user._id;
    const collection = await Collection.findOne({ _id, _user });
    if (!collection) throw new Error();
    // The following function comes from '../services/imageUpload'
    const buffer = await processImage({
      buffer: req.file.buffer,
      width: 360,
      height: 360
    });
    // Save the image buffer to the DB collection object and save
    collection.image = buffer;
    await collection.save();
    res.send();
  } catch (e) {
    res.sendStatus(400);
  }
};

// Sends back updated collection to client, given req.params id and req.body name and description
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

// Sends back status code to client, given req.params id
exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCollection = await Collection.findByIdAndDelete(id);
    // Deletes all recipes related to the collection (cascade)
    await Recipe.deleteMany({ _collection: deletedCollection._id });
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(404);
  }
};
