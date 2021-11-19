import { StrapiUser } from '@csl/types';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(
	async (req, res) => {
		const user: StrapiUser = (req.session as any).user;

		if (user) {
			res.json({ user });
		} else {
			res.json({ user: null });
		}
	},
	{ cookieName: 'data', password: process.env.COOKIE_SECRET }
);
