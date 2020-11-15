import winston from 'winston';
import { MongoDB } from 'winston-mongodb';
import { environment as env } from '@environments/environment';
import { ILogMetadata } from '../../../../../libs/shared/src/lib/shared';

const logger = winston.createLogger({
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

export const saveEvent = (msg: string, metadata?: ILogMetadata) => {
  logger.log('info', msg, { metadata });
};

export const saveError = (err: string, metadata?: ILogMetadata) => {
  logger.log('error', err, { metadata });
};
