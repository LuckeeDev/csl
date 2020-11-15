import winston from 'winston';
import { MongoDB } from 'winston-mongodb';
import { environment as env } from '@environments/environment';

export const logger = winston.createLogger({
  transports: [
    new MongoDB({
      level: 'info',
      db: env.DB_URI,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      collection: 'events',
      name: 'info-transport',
      tryReconnect: true,
    }),
    new MongoDB({
      level: 'error',
      db: env.DB_URI,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      collection: 'errors',
      name: 'errors-transport',
      tryReconnect: true,
    }),
  ],
});
