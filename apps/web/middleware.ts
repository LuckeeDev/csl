import { Permission } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';
import checkPermissions from 'utils/auth/checkPermissions';

export default withAuth({
	callbacks: {
		authorized: ({ token, req }) => {
			if (req.nextUrl.pathname.startsWith('/dashboard/shop')) {
				return checkPermissions(token, [Permission.SHOP_MANAGER]);
			}

			if (
				req.nextUrl.pathname.startsWith('/dashboard/groups/all') ||
				req.nextUrl.pathname.startsWith('/dashboard/users')
			) {
				return checkPermissions(token, [Permission.USERS_MANAGER]);
			}

			if (req.nextUrl.pathname.startsWith('/dashboard/articles')) {
				return checkPermissions(token, [Permission.NEWS_EDITOR]);
			}

			if (token) {
				return true;
			}

			return false;
		},
	},
});

export const config = {
	matcher: [
		'/shop/:path*',
		'/invite/:path*',
		'/events/:path*',
		'/articles/:path*',
		'/dashboard/:path*',
	],
};
