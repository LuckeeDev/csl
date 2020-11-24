import winston from 'winston';
import { MongoDB } from 'winston-mongodb';
import { environment as env } from '@environments/environment';
import { ILogMetadata } from '@csl/shared';

const eventLogger = winston.createLogger({
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
  ],
});

export const saveEvent = (msg: string, metadata: ILogMetadata) => {
  eventLogger.log('info', msg, { metadata });
};

const errorLogger = winston.createLogger({
  transports: [
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

export const saveError = (msg: string, metadata: ILogMetadata) => {
  errorLogger.log('error', msg, { metadata });
};
