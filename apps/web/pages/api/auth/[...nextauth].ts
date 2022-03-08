import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import prisma from 'prisma/client';
import GoogleProvider from 'next-auth/providers/google';

const nextAuthOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	adapter: PrismaAdapter(prisma),
	theme: {
		logo: '/logo.png',
		colorScheme: 'dark',
	},
	providers: [
		GoogleProvider({
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			clientId: process.env.GOOGLE_CLIENT_ID!,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async signIn({ user }) {
			const emailDomain = user.email?.split('@')[1];
			const isAllowedToSignIn = emailDomain === 'liceolussana.eu';

			if (isAllowedToSignIn) {
				return true;
			} else {
				return '/';
			}
		},
		async jwt(params) {
			if (params.user) {
				const user = await prisma.user.findUnique({
					// params.token.sub is the user's id
					where: { id: params.token.sub },
					include: { roles: true },
				});

				const permissions = user?.roles.map((r) => r.permissions).flat();

				params.token.permissions = permissions;
			}

			return params.token;
		},
		async session(params) {
			const { permissions } = params.token;

			params.session.user.permissions = permissions;

			return params.session;
		},
	},
};

export default NextAuth(nextAuthOptions);
