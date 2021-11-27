import { NextRequest, NextResponse } from 'next/server';
import jwt from '@tsndr/cloudflare-worker-jwt';

export async function verifyAuth(request: NextRequest) {
	const { token } = request.cookies;
	const secret = process.env.JWT_SECRET;

	try {
		const verified = await jwt.verify(token, secret);

		return verified;
	} catch (err) {
		return false;
	}
}

export async function middleware(req: NextRequest) {
	const isLoggedIn = await verifyAuth(req);

	if (isLoggedIn) {
		NextResponse.next();
	} else {
		NextResponse.redirect('/login');
	}
}
