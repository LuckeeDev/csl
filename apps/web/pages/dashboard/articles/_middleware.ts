import { Permission } from '@prisma/client';
import withAuth from 'next-auth/middleware';
import checkPermissions from 'utils/auth/checkPermissions';

export default withAuth({
	callbacks: {
		authorized: ({ token }) =>
			checkPermissions(token, [Permission.NEWS_EDITOR]),
	},
});
