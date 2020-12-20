import passport, { Profile } from 'passport';
import { Strategy } from 'passport-google-oauth20';
const keys = require('../config/keys');
import User, { IUser } from '../models/user';

passport.serializeUser(
  (user: IUser, done: (error: Error, userId: String) => void): void => {
    done(null, user.id);
  },
);

passport.deserializeUser(
  async (id: string, done: (error: Error, user: IUser) => void) => {
    const user: IUser = await User.findById(id);
    done(null, user);
  },
);

passport.use(
  new Strategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: Error, user: IUser) => void,
    ) => {
      const existingUser: IUser = await User.findOne({ googleId: profile.id }); // Find a user in our DB with google id

      if (existingUser) {
        return done(null, existingUser);
      }

      const user: IUser = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      });
      done(null, user);
    },
  ),
);
