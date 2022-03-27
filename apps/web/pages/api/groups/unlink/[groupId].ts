import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';
import { UnlinkUser } from 'types/groups';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const patchQuerySchema = Joi.object({
	groupId: Joi.string().required(),
});

const patchBodySchema = Joi.object({
	unlink: Joi.string().valid('MANAGERS', 'USERS').required(),
	users: Joi.array().items(Joi.string()).required(),
});

handler.patch(
	session,
	hasPermission(Permission.USERS_MANAGER),
	validate({ body: patchBodySchema, query: patchQuerySchema }),
	async (req, res) => {
		const unlink: UnlinkUser = req.body.unlink;
		const users: string[] = req.body.users;
		const groupId = req.query.groupId as string;

		const group = await prisma.group.update({
			where: { id: groupId },
			data: {
				...(unlink === UnlinkUser.USERS && {
					users: {
						disconnect: users.map((id) => ({ id })),
					},
				}),
				...(unlink === UnlinkUser.MANAGERS && {
					managers: {
						disconnect: users.map((id) => ({ id })),
					},
				}),
			},
			include: {
				managers: true,
				_count: {
					select: {
						users: true,
					},
				},
			},
		});

		res.status(201).json({ group });
	}
);

export default handler;
