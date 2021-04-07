import { Document } from 'mongoose';
import { IUser } from '../user';

export interface ILogMetadata {
	category:
		| 'commissioni'
		| 'orders'
		| 'payments'
		| 'qp'
		| 'logs'
		| 'accounts'
		| 'server'
		| 'reports'
		| 'firebase'
		| 'orientamento'
		| 'coge'
		| 'products';
	user?: IUser['email'];
	newState?: boolean;
	err?: any;
}

export interface ILog {
	timestamp: Date;
	level: 'info' | 'error';
	message: string;
	meta: ILogMetadata;
}

export interface ILogModel extends Document, ILog {}
