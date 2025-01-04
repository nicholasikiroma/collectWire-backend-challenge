import app from './app';
import { config, logger } from './config';
import http from 'http';

const server = http.createServer(app);

async function startServer() {
  server.listen(config.port || 8088, (): void => {
    logger.info(`[${config.env}] Listening to port ${config.port}`);
  });
}

startServer();
