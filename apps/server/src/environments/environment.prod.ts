import * as dotenv from 'dotenv';
import { join } from 'path';

const env: { [key: string]: any } = dotenv.config({
  path: join(__dirname, 'environments', '.prod.env'),
}).parsed;

env.COOKIE_KEYS = env.COOKIE_KEYS.split(';');

export const environment = {
  production: true,
  client: 'https://cslussana-test.tk',

  ...env,
};
