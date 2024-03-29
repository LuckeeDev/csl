import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';
import prisma from 'prisma/client';

const postBodySchema = Joi.object({
	article: Joi.object({
		title: Joi.string().required(),
		content: Joi.string().required(),
		author: Joi.string().required(),
		readingTime: Joi.number().required(),
		imageId: Joi.string().required(),
	}),
});

const handler = connect<NextApiRequest, NextApiResponse>();

handler.get(session, hasPermission(Permission.NEWS_EDITOR), async (_, res) => {
	const articles = await prisma.article.findMany({
		orderBy: { created_at: 'desc' },
	});

	res.status(200).json({ articles });
});

handler.post(
	session,
	hasPermission(Permission.NEWS_EDITOR),
	validate({ body: postBodySchema }),
	async (req, res) => {
		const { article } = req.body;

		const savedArticle = await prisma.article.create({ data: article });

		res.json(savedArticle);
	}
);

export default handler;
