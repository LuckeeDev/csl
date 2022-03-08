// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { LoggerInstance, Session } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuthJWT, { JWT, JWTOptions, getToken } from 'next-auth/jwt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuthReact from 'next-auth/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuthMiddleware, {
	NextAuthMiddlewareOptions,
} from 'next-auth/middleware';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from 'next/server';
import { Permission } from '@prisma/client';
import { NextApiRequest } from 'next';

export interface SessionUser {
	email?: string | null;
	name?: string | null;
	image?: string | null;
	permissions?: Permission[] | null;
}

interface ExtendedGetSessionParams {
	req?: NextRequest | IncomingMessage;
	ctx?: {
		req: IncomingMessage;
	};
	event?: 'storage' | 'timer' | 'hidden' | string;
	triggerEvent?: boolean;
	broadcast?: boolean;
}

interface ExtendedGetTokenParams<R extends boolean = false> {
	/** The request containing the JWT either in the cookies or in the `Authorization` header. */
	req: NextApiRequest | NextRequest;
	/**
	 * Use secure prefix for cookie name, unless URL in `NEXTAUTH_URL` is http://
	 * or not set (e.g. development or test instance) case use unprefixed name
	 */
	secureCookie?: boolean;
	/** If the JWT is in the cookie, what name `getToken()` should look for. */
	cookieName?: string;
	/**
	 * `getToken()` will return the raw JWT if this is set to `true`
	 * @default false
	 */
	raw?: R;
	secret: string;
	decode?: JWTOptions['decode'];
	logger?: LoggerInstance | Console;
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

	declare function getToken<R extends boolean = false>(
		params?: ExtendedGetTokenParams<R>
	): Promise<R extends true ? string : JWT | null>;
}

declare module 'next-auth/react' {
	declare async function getSession(
		params?: ExtendedGetSessionParams
	): Promise<Session | null>;
}

declare module 'next-auth/middleware' {
	declare function withAuth(
		params: NextAuthMiddlewareOptions
	):
		| Promise<any>
		| ((request: NextRequest, event: NextFetchEvent) => Promise<any>);
}
