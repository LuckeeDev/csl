// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';
import { Permission } from '@prisma/client';

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
