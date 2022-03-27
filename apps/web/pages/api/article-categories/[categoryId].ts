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
	categoryId: Joi.string().required(),
});

handler.delete(
	session,
	hasPermission(Permission.NEWS_EDITOR),
	validate({ query: deleteQuerySchema }),
	async (req, res) => {
		const categoryId = req.query.categoryId as string;

		await prisma.articleCategory.delete({ where: { id: categoryId } });

		res.status(204).end();
	}
);

export default handler;
