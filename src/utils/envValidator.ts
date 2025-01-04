import { cleanEnv, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'test', 'production', 'staging'],
      default: 'development',
    }),
    PORT: str({ default: '8088' }),
  });
};

export default validateEnv;
