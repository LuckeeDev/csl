import { StrapiAuthResponse } from '@csl/types';
import withSession from '@/utils/withSession';

const AUTH_URL = 'http://localhost:1337/auth';

export default withSession(async (req, res) => {
	const { access_token, provider } = req.query;

	const url = `${AUTH_URL}/${provider}/callback?access_token=${access_token}`;

	const data: StrapiAuthResponse = await fetch(url).then((res) => res.json());

	req.session.set('user', data.user);
	req.session.set('jwt', data.jwt);

	await req.session.save();

	res.redirect('/');
});
