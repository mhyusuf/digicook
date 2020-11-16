const { Schema, model } = require('mongoose');

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: Buffer
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ]
});

collectionSchema.index({ name: 'text', description: 'text' });

module.exports = model('Collection', collectionSchema);
