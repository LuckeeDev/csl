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
	q: Joi.string().allow(''),
});

handler.get(
	session,
	hasPermission(Permission.USERS_MANAGER),
	validate({ query: getQuerySchema }),
	async (req, res) => {
		const query = req.query.q as string;

		if (!query) {
			res.status(200).json([]);
		}

		const users = await prisma.user.findMany({
			where: {
				OR: [{ email: { contains: query } }, { name: { contains: query } }],
			},
		});

		res.status(200).json(users);
	}
);

export default handler;
