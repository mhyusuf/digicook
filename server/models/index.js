const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');

module.exports = () =>
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
