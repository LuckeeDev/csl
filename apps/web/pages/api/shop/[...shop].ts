import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const postBodySchema = Joi.object({
	shopSession: Joi.object({
		name: Joi.string().required(),
		start: Joi.date().required(),
		end: Joi.date().required(),
	}).required(),
});

const patchBodySchema = Joi.object({
	shopSession: Joi.object({
		name: Joi.string(),
		start: Joi.date(),
		end: Joi.date(),
	}).required(),
});

const patchQuerySchema = Joi.object({
	shop: Joi.array().length(1).items(Joi.string()).required(),
});

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(
	session,
	hasPermission(Permission.SHOP_MANAGER),
	validate({ body: postBodySchema }),
	async (req, res) => {
		const { shopSession } = req.body;

		const savedSession = await prisma.shopSession.create({ data: shopSession });

		res.json(savedSession);
	}
);

handler.patch(
	session,
	hasPermission(Permission.SHOP_MANAGER),
	validate({ body: patchBodySchema, query: patchQuerySchema }),
	async (req, res) => {
		const shopSessionID = req.query.shop[0];

		const { shopSession } = req.body;

		const savedShopSession = await prisma.shopSession.update({
			where: { id: shopSessionID },
			data: shopSession,
		});

		res.json(savedShopSession);
	}
);

export default handler;
