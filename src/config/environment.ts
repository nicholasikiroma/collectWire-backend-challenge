import dotenv from 'dotenv';
import path from 'path';
import validateEnv from '../utils/envValidator';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

validateEnv();

const config = {
  env: process.env.NODE_ENV as string,
  port: process.env.PORT as string,
};

export default config;
