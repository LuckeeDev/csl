import isLoggedIn from 'middlewares/isLoggedIn';
import session from 'middlewares/session';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(session, isLoggedIn, async (req, res) => {
	const userId = req.user?.id as string;

	const user = await prisma.user.findUnique({
		where: { id: userId },
		include: {
			group: true,
			managedGroups: {
				include: { _count: { select: { users: true, managers: true } } },
			},
		},
	});

	if (!user) {
		return res.status(401).end();
	}

	return res.json({
		group: user.group,
		managedGroups: user.managedGroups,
	});
});

export default handler;
