import express from 'express';

import * as matrixOps from './matrixOps.controller';
import { upload } from '../../middlewares';

const matrixOpsRouter = express.Router();

// use upload middleware for all routes
matrixOpsRouter.use(upload);

matrixOpsRouter.post('/echo', matrixOps.echo);
matrixOpsRouter.post('/invert', matrixOps.invert);
matrixOpsRouter.post('/flatten', matrixOps.flatten);
matrixOpsRouter.post('/sum', matrixOps.sum);
matrixOpsRouter.post('/multiply', matrixOps.multiply);

export default matrixOpsRouter;
