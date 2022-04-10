import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const deleteQuerySchema = Joi.object({
	eventId: Joi.string().required(),
});

handler.delete(
	session,
	hasPermission(Permission.EVENTS_MANAGER),
	validate({ query: deleteQuerySchema }),
	async (req, res) => {
		const eventId = req.query.eventId as string;

		await prisma.event.delete({ where: { id: eventId } });

		res.status(200).end();
	}
);

export default handler;
