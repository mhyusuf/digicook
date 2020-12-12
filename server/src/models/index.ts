import mongoose from 'mongoose';
const { mongoURI } = require('../config/keys');

// Connect to Mongo DB using mongoose - set options to avoid console error messages
module.exports = () =>
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
