const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const { googleClientID, googleClientSecret } = require('../config/keys'); // Import Google API keys
const User = require('../models/user');

// Distill user object to just user id (on login attempt)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Finds user information by id, returns user as object to be stored on req (when user is logged in)
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new Strategy(
    // Set up Google keys to be sent to Google Auth
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback' // Define callback route to send users to after user submit login information
    },
    // After login, Google returns accessToken, refreshToken and profile
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id }); // Find a user in our DB with google id

      // If user exists, proceed to next callback
      if (existingUser) {
        return done(null, existingUser);
      }

      // If user does not exist in our DB, store new user using Mongoose and return user object
      const user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile._json.email
      });
      done(null, user);
    }
  )
);
