import withSession from '@/utils/withSession';
import { StrapiUser } from '@csl/types';
import serverQuery from '@/graphql/serverQuery';
import { GET_USER_QUERY } from '@/graphql/queries/getUser';

interface GetUserResult {
	me: StrapiUser;
}

export default withSession(async (req, res) => {
	const jwt: string = req.session.get('jwt');

	const {
		data: { me: user },
	} = await serverQuery<GetUserResult>(GET_USER_QUERY, {
		jwt,
		useCache: false,
	});

	req.session.set('user', user);

	await req.session.save();

	res.json({ user, jwt });
});
