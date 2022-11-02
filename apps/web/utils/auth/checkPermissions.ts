import { Permission } from '@prisma/client';
import { JWT } from 'next-auth/jwt';

/**
 * @param token jwt token.
 * @param permissions the `Permission`(s) to check.
 */
export default function checkPermissions(
	token: JWT | null,
	permissions: Permission[]
) {
	const resultsArray = permissions.map(
		(permission) => token?.permissions?.includes(permission) ?? false
	);

	return !resultsArray.includes(false);
}
