import { environment } from '@/environments/environment';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

function unsetCookieToken(res: NextApiResponse<unknown>) {
	// @see https://stackoverflow.com/a/57562908
	res.setHeader(
		'Set-Cookie',
		serialize('token', '', {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			expires: new Date(1970, 0, 1),
			domain: environment.cookieDomain,
			sameSite: 'lax',
		})
	);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	unsetCookieToken(res);

	res.redirect('/');
}
