import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const patchQuerySchema = Joi.object({
	userId: Joi.string().required(),
}).required();

const patchBodySchema = Joi.object({
	roles: Joi.array().items(Joi.string()).required(),
}).required();

handler.patch(
	session,
	hasPermission(Permission.USERS_MANAGER),
	validate({ query: patchQuerySchema, body: patchBodySchema }),
	async (req, res) => {
		const roles = req.body.roles as string[];
		const userId = req.query.userId as string;

		const newUser = await prisma.user.update({
			where: { id: userId },
			data: { roles: { set: roles.map((role) => ({ id: role })) } },
			include: { roles: true },
		});

		res.status(201).json(newUser);
	}
);

export default handler;
