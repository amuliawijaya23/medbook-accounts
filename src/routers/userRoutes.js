import { newUser, findUser, removeUser } from '../db/controllers/user.controller.js';

import { isAuthenticated } from '../db/controllers/auth.controller.js';

export default (router) => {
  router.post('/user/new', newUser);
  router.get('/user/:id', isAuthenticated, findUser);
  router.delete('/user/delete/:id', removeUser);
};
