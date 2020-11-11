const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String
});

module.exports = model('User', userSchema);
