import { Permission } from '@prisma/client';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(
	session,
	hasPermission(Permission.EVENTS_MANAGER),
	async (req, res) => {
		const serviceAccount = await prisma.serviceAccount.findUnique({
			where: { userId: req.user?.id },
		});

		res.status(200).json(serviceAccount);
	}
);

export default handler;
