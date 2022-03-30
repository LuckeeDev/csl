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
	endDate: Joi.date().required(),
	startDate: Joi.date().required(),
	eventId: Joi.string().required(),
	name: Joi.string().required(),
});

handler.get(
	session,
	hasPermission(Permission.EVENTS_MANAGER),
	async (_, res) => {
		const timeSlots = await prisma.timeSlot.findMany();

		res.status(200).json(timeSlots);
	}
);

handler.post(
	session,
	hasPermission(Permission.EVENTS_MANAGER),
	validate({ body: postBodySchema }),
	async (req, res) => {
		const timeSlot = await prisma.timeSlot.create({
			data: {
				start: req.body.startDate,
				end: req.body.endDate,
				event: {
					connect: {
						id: req.body.eventId,
					},
				},
				name: req.body.name,
			},
		});

		res.status(201).json(timeSlot);
	}
);

export default handler;
