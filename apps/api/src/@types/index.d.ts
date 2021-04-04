import { IUser } from '@csl/shared';
import * as session from 'express-session';

declare module 'express' {
	interface Request<BodyType = Record<string, any>> {
		user: IUser;
		body: BodyType;
		session: session.Session &
			Partial<session.SessionData> & { returnTo?: string };
	}
}
