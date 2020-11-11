const express = require('express');

const { recipeRouter } = require('./routes');
const connectDB = require('./models');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use('/api/recipes', recipeRouter);

connectDB().then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
