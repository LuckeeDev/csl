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

const getQuerySchema = Joi.object({
	page: Joi.number().integer(),
});

const postBodySchema = Joi.object({
	name: Joi.string().required(),
}).required();

handler.get(
	session,
	hasPermission(Permission.USERS_MANAGER),
	validate({ query: getQuerySchema }),
	async (req, res) => {
		const page = req.query.page ? Number(req.query.page) : 1;

		const skip = 20 * (page - 1);
		const take = 20;

		const groups = await prisma.group.findMany({
			skip,
			take,
			include: { _count: { select: { users: true, managers: true } } },
			orderBy: { name: 'asc' },
		});

		const groupsCount = await prisma.group.count();

		if (page === 1) {
			const noGroupUsers = await prisma.user.count({
				where: { groups: { none: {} } },
			});

			const noGroup: ExtendedGroup = {
				_count: {
					users: noGroupUsers,
					managers: 0,
				},
				id: 'none',
				name: 'Utenti senza gruppo',
			};

			const result = [noGroup, ...groups];

			res.status(200).json({ groups: result, groupsCount: groupsCount });
		} else {
			res.status(200).json({ groups: groups, groupsCount: groupsCount });
		}
	}
);

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
