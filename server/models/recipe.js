const { Schema, model } = require('mongoose'); // Import mongoose schema class

// Create new recipie schema
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
      type: Buffer // Store buffer stream of bytes
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
    timestamps: true // Add created at / updated at properties to document
  }
);

module.exports = model('Recipe', recipeSchema); // Export model
