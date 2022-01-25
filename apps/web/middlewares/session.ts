import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { NextHandler } from 'next-connect';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';
import { ExtendedApiRequest } from 'types';

export default async function session(
	req: ExtendedApiRequest,
	res: NextApiResponse,
	next: NextHandler
) {
	const session = await getServerSession({ req, res }, nextAuthOptions);

	if (session.user) {
		req.user = session.user;
	} else {
		req.user = null;
	}

	next();
}
