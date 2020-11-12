const Collection = require('../models/collection');
const { processImage } = require('../services/imageUpload');

exports.getCollections = () => {};

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
    console.log(req.body, req.file);
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
    console.log(e.message);
    res.sendStatus(400);
  }
};

exports.updateCollection = () => {};

exports.deleteCollection = () => {};
