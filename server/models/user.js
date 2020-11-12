const { Schema, model } = require('mongoose');

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

module.exports = model('User', userSchema);
