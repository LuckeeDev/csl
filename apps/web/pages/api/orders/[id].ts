import Joi from 'joi';
import isLoggedIn from 'middlewares/isLoggedIn';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const deleteQuerySchema = Joi.object({
	id: Joi.string().required(),
}).required();

handler.delete(
	session,
	isLoggedIn,
	validate({ query: deleteQuerySchema }),
	async (req, res) => {
		const userId = req.user?.id;
		const orderId = req.query.id as string;
		const now = new Date();

		await prisma.order.deleteMany({
			// Only delete if the order is owned by the user and if the shop session is active
			where: {
				id: orderId,
				user: { id: userId },
				product: { shopSession: { end: { gte: now }, start: { lte: now } } },
			},
		});

		return res.status(200).end();
	}
);

export default handler;
