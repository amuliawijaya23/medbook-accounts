import { newUser, findUser, removeUser } from '../db/controllers/user.controller.js';

export default (router) => {
  router.post('/user/new', newUser);
  router.get('/user/:id', findUser);
  router.delete('/user/delete/:id', removeUser);
};
