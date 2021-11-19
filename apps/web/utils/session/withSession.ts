import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler } from 'next';

export default function withSession(handler: NextApiHandler<unknown>) {
	return withIronSessionApiRoute(handler, {
		cookieName: 'data',
		password: process.env.COOKIE_SECRET,
	});
}
