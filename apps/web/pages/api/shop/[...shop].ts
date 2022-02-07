import { Permission } from '@prisma/client';
import joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const postBodySchema = joi.object({
	shopSession: joi.object({
		name: joi.string().required(),
		start: joi.date().required(),
		end: joi.date().required(),
	}),
});

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(
	session,
	hasPermission(Permission.SHOP_MANAGER),
	validate({ body: postBodySchema }),
	async (req, res) => {
		console.log(req, res);
		const { shopSession } = req.body;

		const savedSession = await prisma.shopSession.create({ data: shopSession });

		res.json(savedSession);
	}
);

export default handler;
