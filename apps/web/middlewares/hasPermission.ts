import { Permission } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export default function hasPermission(permission: Permission) {
	return (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
		if (req.user?.permissions?.includes(permission)) {
			next();
		} else {
			res.status(401).end();
		}
	};
}
