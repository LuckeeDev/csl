import { Permission } from '@prisma/client';
import joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const deleteQuerySchema = joi
	.object({
		id: joi.string().required(),
	})
	.required();

handler.delete(
	session,
	hasPermission(Permission.SHOP_MANAGER),
	validate({ query: deleteQuerySchema }),
	async (req, res) => {
		const categoryId = req.query.id as string;

		await prisma.productCategory.delete({ where: { id: categoryId } });

		res.status(204).end();
	}
);

export default handler;
