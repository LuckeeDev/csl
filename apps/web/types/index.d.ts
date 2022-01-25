/* eslint-disable @typescript-eslint/no-unused-vars */
import { Permission } from '@prisma/client';
import { NextApiRequest } from 'next';
import NextAuth from 'next-auth';

export interface SessionUser {
	email?: string | null;
	name?: string | null;
	image?: string | null;
	permissions?: Permission[] | null;
}

declare module 'next-auth' {
	interface Session {
		user: SessionUser;
	}
}

export interface ExtendedApiRequest extends NextApiRequest {
	user: SessionUser;
}
