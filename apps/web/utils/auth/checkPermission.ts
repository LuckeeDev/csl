import { Permission } from '@prisma/client';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface CheckPermissionData {
	jwt?: JWT;
	session?: Session;
}

/**
 * @param data jwt or session. JWT has precedence over session.
 * @param permission the `Permission` to check.
 */
export default function checkPermission(
	data: CheckPermissionData,
	permission: Permission
) {
	// check if we're dealing with the token or the session
	if (data.jwt) {
		return data.jwt.permissions?.includes(permission) ?? false;
	} else if (data.session) {
		return data.session.user.permissions?.includes(permission) ?? false;
	}
}
