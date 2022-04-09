import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export default async function isLoggedIn(
	req: NextApiRequest,
	res: NextApiResponse,
	next: NextHandler
) {
	if (req.user) {
		next();
	} else {
		return res.status(401).end();
	}
}
