import express from 'express';

import * as matrixOps from './matrixOps.controller';
import { upload } from '../../middlewares';

const matrixOpsRouter = express.Router();

// use upload middleware for all routes
matrixOpsRouter.use(upload);

matrixOpsRouter.post('/echo', matrixOps.echo); // Prints out input matrix in matrix format
matrixOpsRouter.post('/invert', matrixOps.invert); // Transposes any given input matrix
matrixOpsRouter.post('/flatten', matrixOps.flatten); // Flattens any given input matrix to a single comma-separated string
matrixOpsRouter.post('/sum', matrixOps.sum); // Returns the sum of a given matrix
matrixOpsRouter.post('/multiply', matrixOps.multiply); // Returns the product of a given matrix

export default matrixOpsRouter;
