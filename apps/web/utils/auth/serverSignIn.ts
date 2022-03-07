/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';

interface ServerSignInParams {
	callbackUrl: NextURL;
}

export default function serverSignIn(params: ServerSignInParams) {
	return NextResponse.redirect(
		`/api/auth/signin?callbackUrl=${params.callbackUrl}`
	);
}
