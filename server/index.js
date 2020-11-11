const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');

const { authRouter, recipeRouter } = require('./routes');
const connectDB = require('./models');
const { cookieKey } = require('./config/keys');
require('./services/passport');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: cookieKey
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter);
app.use('/api/recipes', recipeRouter);

connectDB().then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
