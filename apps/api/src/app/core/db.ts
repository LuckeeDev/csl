import * as mongoose from 'mongoose';
import { environment as env } from '@environments/environment';
import { mongoOptions } from '@/common/config';

export function setupDB() {
	mongoose.connect(env.DB_URI, mongoOptions);

	mongoose.connection.on('connected', () => {
		console.log(`Connected to database: ${env.DB_URI}`);
	});

	mongoose.connection.on('error', (err: any) => {
		console.log(`Database error: ${err}`);
	});
}
