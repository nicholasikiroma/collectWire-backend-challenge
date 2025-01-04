import express from 'express';
import matrixOpsRouter from './matrixOps/matrixOps.router';

const api = express.Router();

api.use('', matrixOpsRouter);

export default api;
