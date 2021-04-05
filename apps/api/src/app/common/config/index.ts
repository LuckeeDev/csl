import { ConnectOptions } from 'mongoose';

/**
 * Advanced options to avoid deprecation warning
 */
export const mongoOptions: ConnectOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
};
