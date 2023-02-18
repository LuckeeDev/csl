import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import toArray from 'middlewares/toArray';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

type AllowedInclude = 'roles';
type IncludeRecord = Partial<Record<AllowedInclude, true>>;

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const getQuerySchema = Joi.object({
	q: Joi.string().allow(''),
	include: Joi.array().items(Joi.string().valid('roles')),
});

handler.get(
	session,
	hasPermission(Permission.USERS_MANAGER),
	toArray('include'),
	validate({ query: getQuerySchema }),
	async (req, res) => {
		const query = req.query.q as string;

		if (!query) {
			res.status(200).json([]);
		}

		const includeQuery = req.query.include as AllowedInclude[];

		const include: IncludeRecord = includeQuery.reduce(
			(acc, current) => ((acc = { ...acc, [current]: true }), acc),
			{}
		);

		const users = await prisma.user.findMany({
			where: {
				OR: [{ email: { contains: query } }, { name: { contains: query } }],
			},
			include,
		});

		res.status(200).json(users);
	}
);

export default handler;
