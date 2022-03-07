/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';
import { environment } from 'environments/environment';

interface ServerSignInParams {
	callbackUrl: NextURL;
}

export default function serverSignIn(params: ServerSignInParams) {
	return NextResponse.redirect(
		`${environment.url}/api/auth/signin?callbackUrl=${params.callbackUrl}`
	);
}
