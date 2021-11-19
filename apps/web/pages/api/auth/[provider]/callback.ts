import { StrapiAuthResponse } from '@csl/types';
import { environment } from '@/environments/environment';
import { serialize } from 'cookie';
import { NextApiResponse } from 'next';
import withSession from '@/utils/session/withSession';
const AUTH_URL = `${environment.strapi}/auth`;

function setCookieToken(res: NextApiResponse<unknown>, token: string) {
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

	const { jwt, user }: StrapiAuthResponse = await fetch(url).then((res) =>
		res.json()
	);

	// Run "setCookieToken" first to prevent conflicts with Iron Session
	setCookieToken(res, jwt);

	// TODO: remove this ugly workaround
	(req.session as any).user = user;

	await req.session.save();

	if (!user.name) {
		res.redirect('/auth/signup');
	} else {
		res.redirect('/');
	}
});
