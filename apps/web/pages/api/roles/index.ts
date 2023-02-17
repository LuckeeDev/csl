import { Permission } from '@prisma/client';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(
	session,
	hasPermission(Permission.USERS_MANAGER),
	async (_, res) => {
		const roles = await prisma.role.findMany();

		res.status(200).json({ roles });
	}
);

export default handler;
