const { Schema, model } = require('mongoose'); // Import mongoose schema class

// Create new user schema
const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String
});

userSchema.virtual('collections', {
  ref: 'Collection',
  localField: '_id',
  foreignField: '_user'
});

module.exports = model('User', userSchema); // Export model
