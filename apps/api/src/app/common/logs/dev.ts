import winston from 'winston';

export const devEventLogger = winston.createLogger({
	transports: [new winston.transports.Console({ level: 'info' })],
});

export const devErrorLogger = winston.createLogger({
	transports: [new winston.transports.Console({ level: 'error' })],
});
