import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const deleteQuerySchema = Joi.object({
	roleId: Joi.string().required(),
}).required();

handler.delete(
	session,
	hasPermission(Permission.USERS_MANAGER),
	validate({ query: deleteQuerySchema }),
	async (req, res) => {
		const roleId = req.query.roleId as string;

		await prisma.role.delete({ where: { id: roleId } });

		res.status(204).end();
	}
);

export default handler;
