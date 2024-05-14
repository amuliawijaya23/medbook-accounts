import { authorization, decision, token } from '../db/controllers/oauth2.controller';

import { isAuthenticated, isClientAuthenticated } from '../db/controllers/auth.controller';

export default (router) => {
  router.get('/oauth2/authorize', isAuthenticated, authorization);
  router.post('/oauth2/authorize', isAuthenticated, decision);
  router.post('/oauth2/token', isClientAuthenticated, token);
};
