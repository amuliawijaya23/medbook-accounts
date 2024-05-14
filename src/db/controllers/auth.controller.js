import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { getUserByEmail } from '../models/user.model.js';
import { getClientbyClientId } from '../models/code.model.js';

import bcrypt from 'bcrypt';

passport.use(
  new BasicStrategy(async (email, password, done) => {
    try {
      if (!email || !password) return done(null, false);

      const user = await getUserByEmail(email).select('+password');

      if (!user) return done(null, false);

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  'client-basic',
  new BasicStrategy(async (clientId, clientSecret, done) => {
    try {
      if (!clientId || !clientSecret) return done(null, false);

      const client = await getClientbyClientId(clientId).select('+clientSecret');

      if (!client) return done(null, false);

      const isMatch = bcrypt.compareSync(clientSecret, client.clientSecret);

      if (!isMatch) return done(null, false);

      return done(null, client);
    } catch (error) {
      return done(error);
    }
  })
);

export const isAuthenticated = passport.authenticate('basic', { session: false });
export const isClientAuthenticated = passport.authenticate('client-basic', { session: false });
