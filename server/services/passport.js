const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const { googleClientID, googleClientSecret } = require('../config/keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = User.findById(id);
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile._json.email
      });
      done(null, user);
    }
  )
);
