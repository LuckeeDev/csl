import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';
import { ExtendedGroup } from 'types/groups';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const postBodySchema = Joi.object({
	name: Joi.string().required(),
}).required();

handler.post(
	session,
	hasPermission(Permission.USERS_MANAGER),
	validate({ body: postBodySchema }),
	async (req, res) => {
		const group: ExtendedGroup = await prisma.group.create({
			data: { name: req.body.name },
			include: { _count: { select: { users: true, managers: true } } },
		});

		res.status(201).json(group);
	}
);

export default handler;
