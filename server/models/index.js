const mongoose = require('mongoose');

// Connect to Mongo DB using mongoose - set options to avoid console error messages
module.exports = () =>
  mongoose.connect('mongodb://localhost:27017/digicook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
