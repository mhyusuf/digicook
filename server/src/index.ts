// Import modules & keys
import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';

const authRouter: express.Router = require('./routes/authRouter');
const collectionRouter: express.Router = require('./routes/collectionRouter');
const recipeRouter: express.Router = require('./routes/recipeRouter');
const keys = require('./config/keys');

// Connect to Mongo database
const connectDB = require('./models');

// Initialize passport
require('./services/passport');

// Set up express app
const PORT = process.env.PORT || 5000;
const app = express();

// Set up middleware to handle incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cookieKey: string = keys.cookieKey;

// Initialize session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Route user requests to corresponding router files
app.use('/auth', authRouter);
app.use('/api/collections', collectionRouter);
app.use('/api/recipes', recipeRouter);

// After DB connection, listen on PORT
connectDB().then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
