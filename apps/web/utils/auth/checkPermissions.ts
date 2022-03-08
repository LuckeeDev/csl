import { Permission } from '@prisma/client';
import { JWT } from 'next-auth/jwt';

/**
 * @param data jwt token.
 * @param permission the `Permission`(s) to check.
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
