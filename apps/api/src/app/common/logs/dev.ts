import winston from 'winston';

export const devEventLogger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			level: 'info',
			format: winston.format.json({ space: 4 }),
		}),
	],
});

export const devErrorLogger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			level: 'error',
			format: winston.format.json({ space: 4 }),
		}),
	],
});
