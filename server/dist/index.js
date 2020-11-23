// Import modules & keys
var express = require('express');
var passport = require('passport');
var cookieSession = require('cookie-session');
var _a = require('./routes'), authRouter = _a.authRouter, collectionRouter = _a.collectionRouter, recipeRouter = _a.recipeRouter;
var cookieKey = require('./config/keys').cookieKey;
// Connect to Mongo database
var connectDB = require('./models');
// Initialize passport
require('./services/passport');
// Set up Express app
var PORT = process.env.PORT || 5000;
var app = express();
// Set up middleware to handle incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Initialize session
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
// Route user requests to corresponding router files
app.use('/auth', authRouter);
app.use('/api/collections', collectionRouter);
app.use('/api/recipes', recipeRouter);
// After DB connection, listen on PORT
connectDB().then(function () {
    console.log('Connected to MongoDB');
    app.listen(PORT, function () {
        console.log("Server listening on http://localhost:" + PORT);
    });
});
