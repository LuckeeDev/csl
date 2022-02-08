import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import serverSignIn from 'utils/auth/serverSignIn';
import { getToken } from 'next-auth/jwt';
import checkPermission from 'utils/auth/checkPermission';
import { Permission } from '@prisma/client';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const token = await getToken({ req, secret: process.env.AUTH_SECRET! });

	if (token && checkPermission({ jwt: token }, Permission.NEWS_EDITOR)) {
		return NextResponse.next();
	} else {
		return serverSignIn({ callbackUrl: req.nextUrl });
	}
}
