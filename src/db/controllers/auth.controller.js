import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { User, getUserByEmail } from '../models/user.model.js';

import bcrypt from 'bcrypt';

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    try {
      if (!email || !password) return cb(null, false);

      const user = await getUserByEmail(email).select('+password');

      if (!user) return cb(null, false);

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) return cb(null, false);

      return cb(null, user);
    } catch (error) {
      console.log(error);
    }
  })
);

export const isAuthenticated = passport.authenticate('basic', { session: false });
