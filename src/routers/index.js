import { Router } from 'express';

import userRoutes from './userRoutes.js';
import clientRoutes from './clientRoutes.js';

const router = Router();

export default () => {
  userRoutes(router);
  clientRoutes(router);
  return router;
};
