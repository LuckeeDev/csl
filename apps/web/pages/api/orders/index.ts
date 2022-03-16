import { PRODUCT_SIZES } from 'data/productSizes';
import Joi from 'joi';
import isLoggedIn from 'middlewares/isLoggedIn';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const postBodySchema = Joi.object({
	productId: Joi.string().required(),
	quantity: Joi.number().integer().required(),
	color: Joi.string().regex(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i),
	size: Joi.string().valid(...PRODUCT_SIZES),
}).required();

handler.post(
	session,
	isLoggedIn,
	validate({ body: postBodySchema }),
	async (req, res) => {
		const { productId, quantity, color, size } = req.body;

		const order = await prisma.order.create({
			data: {
				product: {
					connect: {
						id: productId,
					},
				},
				quantity,
				color,
				size,
				user: {
					connect: {
						id: req.user?.id,
					},
				},
			},
		});

		res.status(201).json(order);
	}
);

export default handler;
