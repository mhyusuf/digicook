import passport, { Profile } from 'passport';
import { Strategy } from 'passport-google-oauth20';
const keys = require('../config/keys');
import User, { IUser } from '../models/user';

// Distill user object to just user id (on login attempt)
passport.serializeUser(
  (user: IUser, done: (error: Error, userId: String) => void): void => {
    done(null, user.id);
  },
);

// Finds user information by id, returns user as object to be stored on req (when user is logged in)
passport.deserializeUser(
  async (id: string, done: (error: Error, user: IUser) => void) => {
    const user: IUser = await User.findById(id);
    done(null, user);
  },
);

passport.use(
  new Strategy(
    // Set up Google keys to be sent to Google Auth
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', // Define callback route to send users to after user submit login information
    },
    // After login, Google returns accessToken, refreshToken and profile
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: Error, user: IUser) => void,
    ) => {
      const existingUser: IUser = await User.findOne({ googleId: profile.id }); // Find a user in our DB with google id

      // If user exists, proceed to next callback
      if (existingUser) {
        return done(null, existingUser);
      }

      // If user does not exist in our DB, store new user using Mongoose and return user object
      const user: IUser = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      });
      done(null, user);
    },
  ),
);
