import { StrapiAuthResponse } from '@csl/types';
import withSession from '@/utils/session/withSession';
import { environment } from '@/environments/environment';
import { serialize } from 'cookie';
import { NextApiResponse } from 'next';

const AUTH_URL = `${environment.strapi}/auth`;

function setCookieToken(res: NextApiResponse<any>, token: string) {
	// @see https://stackoverflow.com/a/57562908
	res.setHeader(
		'Set-Cookie',
		serialize('token', token, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age
			domain: environment.cookieDomain,
			sameSite: 'lax',
		})
	);
}

export default withSession(async (req, res) => {
	const { access_token, provider } = req.query;

	const url = `${AUTH_URL}/${provider}/callback?access_token=${access_token}`;

	const data: StrapiAuthResponse = await fetch(url).then((res) => res.json());

	req.session.set('user', data.user);
	req.session.set('jwt', data.jwt);

	await req.session.save();

	setCookieToken(res, data.jwt);
	res.redirect('/');
});
