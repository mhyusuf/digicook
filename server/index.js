const express = require('express');

const connectDB = require('./models');

const app = express();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
