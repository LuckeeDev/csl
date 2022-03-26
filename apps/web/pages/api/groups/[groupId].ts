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
	groupId: Joi.string().required(),
});

const patchBodySchema = Joi.object({
	managersIds: Joi.array().items(Joi.string()).required(),
});

handler.get(
	session,
	hasPermission(Permission.USERS_MANAGER),
	validate({ query: getQuerySchema }),
	async (req, res) => {
		const groupId = req.query.groupId as string;

		const group = await prisma.group.findUnique({
			where: { id: groupId },
			include: { managers: true, _count: { select: { users: true } } },
		});

		res.status(200).json({ group });
	}
);

handler.patch(
	session,
	hasPermission(Permission.USERS_MANAGER),
	validate({ body: patchBodySchema, query: getQuerySchema }),
	async (req, res) => {
		const groupId = req.query.groupId as string;
		const managersIds = req.body.managersIds as string[];

		const group = await prisma.group.update({
			where: { id: groupId },
			data: { managers: { connect: managersIds.map((id) => ({ id })) } },
			include: { managers: true, _count: { select: { users: true } } },
		});

		res.status(201).json({ group });
	}
);

export default handler;
