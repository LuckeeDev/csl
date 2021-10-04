import { StrapiUser } from '@csl/types';
import serverQuery from '@/graphql/serverQuery';
import { GET_USER_QUERY } from '@/graphql/queries/getUser';
import { NextApiRequest, NextApiResponse } from 'next';

interface GetUserResult {
	me: StrapiUser;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const jwt = req.cookies.token ?? null;

	const {
		data: { me: user },
	} = await serverQuery<GetUserResult>(GET_USER_QUERY, {
		jwt,
		useCache: false,
	});

	res.json({ user });
}
