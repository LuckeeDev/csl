import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import serverSignIn from 'utils/auth/serverSignIn';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const token = await getToken({ req, secret: process.env.AUTH_SECRET! });

	if (token) {
		return NextResponse.next();
	} else {
		return serverSignIn({ callbackUrl: req.nextUrl });
	}
}
