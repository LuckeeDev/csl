import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const getQuerySchema = Joi.object({
	page: Joi.number().integer(),
});

handler.get(
	session,
	hasPermission(Permission.EVENTS_MANAGER),
	validate({ query: getQuerySchema }),
	async (req, res) => {
		const page = req.query.page ? Number(req.query.page) : 1;

		const skip = 20 * (page - 1);
		const take = 20;

		const seminars = await prisma.seminar.findMany({
			include: {
				timeSlot: { include: { event: true } },
			},
			skip,
			take,
		});

		const seminarsCount = await prisma.seminar.count();

		res.status(200).json({ seminars, seminarsCount });
	}
);

export default handler;
