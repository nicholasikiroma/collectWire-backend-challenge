import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import createError from 'http-errors';
import httpStatus from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import api from './modules/api';
import { responseFormatter, config } from './config';
import { errorMiddleware } from './middlewares';
import { ApiError } from './utils';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/api/v1', api);
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CollectWire Backend Challenge',
      version: '1.0.0',
      description:
        'Create a simple NodeJs/Typescript project with an Express webserver that is accessible on any port 8088. There is a csv file of a matrix would used to test. You are required to create 5 endpoints based on the task below (/echo, /invert, /flatten, /sum, /multiply)',
    },
  },
  apis: ['./src/modules/**/*.router.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

if (config.env !== 'test') {
  app.use(responseFormatter.successHandler);
  app.use(responseFormatter.errorHandler);
}

// send back 404 error for any unknown api requests
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Endpoint Not found'));
});

// convert error to ApiError, if needed
app.use(errorMiddleware.errorConverter);

// handle error
app.use(errorMiddleware.errorHandler);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

export default app;
