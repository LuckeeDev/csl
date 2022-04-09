import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NextHandler } from 'next-connect';

export default async function session(
	req: NextApiRequest,
	_: NextApiResponse,
	next: NextHandler
) {
	const session = await getSession({ req });

	if (session?.user) {
		req.user = session.user;
	} else {
		req.user = null;
	}

	next();
}
