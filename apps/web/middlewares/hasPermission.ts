import { Permission } from '@prisma/client';
import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { ExtendedApiRequest } from 'types';

export default function hasPermission(permission?: Permission) {
	return (req: ExtendedApiRequest, res: NextApiResponse, next: NextHandler) => {
		if (req.user.permissions.includes(permission)) {
			next();
		} else {
			res.status(401).end();
		}
	};
}
