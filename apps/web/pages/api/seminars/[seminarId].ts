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
	seminarId: Joi.string().required(),
});

handler.delete(
	session,
	hasPermission(Permission.EVENTS_MANAGER),
	validate({ query: deleteQuerySchema }),
	async (req, res) => {
		const seminarId = req.query.seminarId as string;

		await prisma.seminar.delete({ where: { id: seminarId } });

		res.status(200).end();
	}
);

export default handler;
