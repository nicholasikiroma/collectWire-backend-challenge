import express from 'express';
import * as matrixOps from './matrixOps.controller';
import { upload } from '../../middlewares';

const matrixOpsRouter = express.Router();

// Use upload middleware for all routes
matrixOpsRouter.use(upload);

/**
 * @openapi
 * /echo:
 *   post:
 *     summary: Prints out input matrix in matrix format
 *     description: Accepts a CSV file containing a matrix and prints it out in matrix format as the response.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully printed matrix
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "1,2,3\n4,5,6\n7,8,9"
 *       400:
 *         description: Bad Request if no file is provided or the file format is invalid
 *       422:
 *         description: Unprocessable Entity if the input matrix is not square
 */
matrixOpsRouter.post('/echo', matrixOps.echo);

/**
 * @openapi
 * /invert:
 *   post:
 *     summary: Transposes any given input matrix
 *     description: Accepts a CSV file containing a matrix and returns the transposed matrix as the response.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully transposed matrix
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "1,4,7\n2,5,8\n3,6,9"
 *       400:
 *         description: Bad Request if no file is provided or the file format is invalid
 *       422:
 *         description: Unprocessable Entity if the input matrix is not square
 */
matrixOpsRouter.post('/invert', matrixOps.invert);

/**
 * @openapi
 * /flatten:
 *   post:
 *     summary: Flattens any given input matrix to a single comma-separated string
 *     description: Accepts a CSV file containing a matrix and returns a flattened string of the matrix values separated by commas.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully flattened matrix
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "1,2,3,4,5,6,7,8,9"
 *       400:
 *         description: Bad Request if no file is provided or the file format is invalid
 *       422:
 *         description: Unprocessable Entity if the input matrix is not square
 */
matrixOpsRouter.post('/flatten', matrixOps.flatten);

/**
 * @openapi
 * /sum:
 *   post:
 *     summary: Returns the sum of a given matrix
 *     description: Accepts a CSV file containing a matrix and returns the sum of all elements.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully calculated sum
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   example: 45
 *       400:
 *         description: Bad Request if no file is provided or the file format is invalid
 *       422:
 *         description: Unprocessable Entity if the input matrix is not square
 */
matrixOpsRouter.post('/sum', matrixOps.sum);

/**
 * @openapi
 * /multiply:
 *   post:
 *     summary: Returns the product of a given matrix
 *     description: Accepts a CSV file containing a matrix and returns the product of all elements.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully calculated product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   example: 362880
 *       400:
 *         description: Bad Request if no file is provided or the file format is invalid
 *       422:
 *         description: Unprocessable Entity if the input matrix is not square
 */
matrixOpsRouter.post('/multiply', matrixOps.multiply);

export default matrixOpsRouter;
