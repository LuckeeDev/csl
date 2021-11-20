import { StrapiAuthResponse } from '@csl/types';
import { environment } from '@/environments/environment';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
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

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { access_token, provider } = req.query;

	const url = `${AUTH_URL}/${provider}/callback?access_token=${access_token}`;

	const { jwt, user }: StrapiAuthResponse = await axios
		.get(url)
		.then((res) => res.data);

	setCookieToken(res, jwt);

	if (!user.name) {
		res.redirect('/?signup=1');
	} else {
		res.redirect('/');
	}
}
