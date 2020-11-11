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
      type: String,
      required: true
    },
    ingredients: {
      type: [{ name: String, quantity: String }],
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Recipe', recipeSchema);
