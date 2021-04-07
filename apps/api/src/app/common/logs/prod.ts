import { environment } from '@environments/environment';
import winston from 'winston';
import { MongoDB } from 'winston-mongodb';

export const prodEventLogger = winston.createLogger({
	transports: [
		new MongoDB({
			level: 'info',
			db: environment.DB_URI,
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

export const prodErrorLogger = winston.createLogger({
	transports: [
		new MongoDB({
			level: 'error',
			db: environment.DB_URI,
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
