// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuthJWT from 'next-auth/jwt';
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

declare module 'next-auth/jwt' {
	interface JWT {
		permissions?: Permission[] | null;
	}
}
