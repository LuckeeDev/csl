import { NextApiRequest, NextApiResponse } from 'next';
import { Session, withIronSession } from 'next-iron-session';

export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (
	req: NextIronRequest,
	res: NextApiResponse
) => void | Promise<void>;

const withSession = (handler: NextIronHandler) =>
	withIronSession(handler, {
		password: process.env.SESSION_PASSWORD,
		cookieName: process.env.COOKIE_NAME,
		cookieOptions: {
			secure: process.env.NODE_ENV === 'production',
		},
	});

export default withSession;
