import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'prisma/client';

export const nextAuthOptions: NextAuthOptions = {
	secret: process.env.AUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	theme: {
		logo: '/logo.png',
		colorScheme: 'light',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session(params) {
			const { roles } = await prisma.user.findUnique({
				where: { id: params.user.id },
				include: { roles: true },
			});

			const permissions = roles.map((r) => r.permissions).flat();

			params.session.user.permissions = permissions;

			return params.session;
		},
	},
};

export default NextAuth(nextAuthOptions);
