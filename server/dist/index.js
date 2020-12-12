"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import modules & keys
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var authRouter = require('./routes/authRouter');
var collectionRouter = require('./routes/collectionRouter');
var recipeRouter = require('./routes/recipeRouter');
var cookieKey = require('./config/keys').cookieKey;
// Connect to Mongo database
var connectDB = require('./models');
// Initialize passport
require('./services/passport');
// Set up express app
var PORT = process.env.PORT || 5000;
var app = express_1.default();
// Set up middleware to handle incoming data
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Initialize session
app.use(cookie_session_1.default({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
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
