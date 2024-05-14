import { newClient, findClient } from '../db/controllers/client.controller.js';

export default (router) => {
  router.post('/client/new', newClient);
  router.get('/client/:id', findClient);
};
