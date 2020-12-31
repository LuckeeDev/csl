import * as dotenv from 'dotenv';
import { join } from 'path';

const env: { [key: string]: any } = dotenv.config({
  path: join(__dirname, 'environments', '.dev.env'),
}).parsed;

env.COOKIE_KEYS = env.COOKIE_KEYS.split(';');

export const environment: { [x: string]: any } = {
  production: false,
  client: 'http://localhost:4200',

  ...env
};
