import { environment } from '@environments/environment';
import { ILogMetadata } from '@csl/shared';
import { devErrorLogger, devEventLogger } from './dev';
import { prodErrorLogger, prodEventLogger } from './prod';

export const saveEvent = (msg: string, metadata: ILogMetadata) => {
	if (environment.ENVIRONMENT === 'dev') {
		devEventLogger.log('info', { msg, ...metadata });
	} else if (environment.ENVIRONMENT === 'prod') {
		prodEventLogger.log('info', msg, { metadata });
	}
};

export const saveError = (msg: string, metadata: ILogMetadata) => {
	if (environment.ENVIRONMENT === 'dev') {
		devErrorLogger.log('error', { msg, ...metadata });
	} else if (environment.ENVIRONMENT === 'prod') {
		prodErrorLogger.log('error', msg, { metadata });
	}
};
