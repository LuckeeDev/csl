import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';
import { PERMISSION_ARRAY } from 'utils/auth/PERMISSION_ARRAY';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const postBodySchema = Joi.object({
	name: Joi.string().required(),
	permissions: Joi.array()
		.min(1)
		.items(Joi.string().valid(...PERMISSION_ARRAY))
		.required(),
}).required();

handler.get(
	session,
	hasPermission(Permission.USERS_MANAGER),
	async (_, res) => {
		const roles = await prisma.role.findMany();

		res.status(200).json({ roles });
	}
);

handler.post(
	session,
	hasPermission(Permission.USERS_MANAGER),
	validate({ body: postBodySchema }),
	async (req, res) => {
		const data = req.body;

		const newRole = await prisma.role.create({
			data: { name: data.name, permissions: data.permissions },
		});

		res.status(201).json(newRole);
	}
);

export default handler;
