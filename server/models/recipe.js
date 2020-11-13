const { Schema, model } = require('mongoose');

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    image: {
      type: Buffer
    },
    ingredients: {
      type: [{ name: String, quantity: String }],
      required: true
    },
    _collection: {
      type: Schema.Types.ObjectId,
      ref: 'Collection'
    },
    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Recipe', recipeSchema);
