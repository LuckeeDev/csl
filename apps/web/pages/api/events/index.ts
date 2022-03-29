import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const postBodySchema = Joi.object({
	name: Joi.string().required(),
});

handler.get(
	session,
	hasPermission(Permission.EVENTS_MANAGER),
	async (_, res) => {
		const events = await prisma.event.findMany();

		res.status(200).json(events);
	}
);

handler.post(
	session,
	hasPermission(Permission.EVENTS_MANAGER),
	validate({ body: postBodySchema }),
	async (req, res) => {
		const name = req.body.name as string;

		const event = await prisma.event.create({ data: { name } });

		res.status(201).json(event);
	}
);

export default handler;
