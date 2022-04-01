import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import prisma from 'prisma/client';
import GoogleProvider from 'next-auth/providers/google';
import { environment } from 'environments/environment';

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
			clientId: environment.google.clientId,
			clientSecret: environment.google.secret,
			authorization: {
				params: {
					hd: 'liceolussana.eu',
				},
			},
		}),
	],
	callbacks: {
		async signIn({ user }) {
			const emailDomain = user.email?.split('@')[1];
			const isAllowedToSignIn = emailDomain === 'liceolussana.eu';

			if (isAllowedToSignIn) {
				return true;
			} else {
				return '/?authError=1';
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
				params.token.id = user?.id;
			}

			return params.token;
		},
		async session(params) {
			const { permissions, id } = params.token;

			params.session.user.permissions = permissions;
			params.session.user.id = id;

			return params.session;
		},
	},
};

export default NextAuth(nextAuthOptions);
