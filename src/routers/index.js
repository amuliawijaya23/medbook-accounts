import { Router } from 'express';

import userRoutes from './userRoutes.js';

const router = Router();

export default () => {
  userRoutes(router);
  return router;
};
