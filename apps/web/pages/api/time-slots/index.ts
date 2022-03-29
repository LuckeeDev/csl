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
	async (_, res) => {
		const timeSlots = await prisma.timeSlot.findMany();

		res.status(201).json(timeSlots);
	}
);

export default handler;
