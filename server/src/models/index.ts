import mongoose from 'mongoose';
const { mongoURI } = require('../config/keys');

export default () =>
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
