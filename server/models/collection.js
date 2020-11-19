const { Schema, model } = require('mongoose'); // Import mongoose schema class

// Create new collection schema
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
  isPrivate: {
    type: Boolean,
    default: false
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

module.exports = model('Collection', collectionSchema); // Export model
