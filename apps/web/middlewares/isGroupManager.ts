import { Permission } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import prisma from 'prisma/client';

export default async function isGroupManager(
	req: NextApiRequest,
	res: NextApiResponse,
	next: NextHandler
) {
	const groupId = req.query.groupId as string;

	if (!req.user || !req.user.id) {
		return res.status(401).end();
	}

	if (req.user.permissions?.includes(Permission.USERS_MANAGER)) {
		next();
	} else {
		const group = await prisma.group.findUnique({
			where: { id: groupId },
			include: { managers: true },
		});

		if (group?.managers.map((m) => m.id).includes(req.user.id)) {
			next();
		} else {
			return res.status(401).end();
		}
	}
}
