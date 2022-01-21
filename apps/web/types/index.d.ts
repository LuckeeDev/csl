import { Role } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			email?: string | null;
			name?: string | null;
			image?: string | null;
			roles?: Role[] | null;
		};
	}
}
