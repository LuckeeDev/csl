import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const patchBodySchema = Joi.object({
	article: Joi.object({
		title: Joi.string(),
		content: Joi.string(),
		author: Joi.string(),
		readingTime: Joi.number(),
		published: Joi.boolean(),
	}).required(),
});

const patchQuerySchema = Joi.object({
	articleId: Joi.string().required(),
});

handler.get(
	session,
	hasPermission(Permission.NEWS_EDITOR),
	validate({ query: patchQuerySchema }),
	async (req, res) => {
		const articleId = req.query.articleId as string;

		const article = await prisma.article.findUnique({
			where: { id: articleId },
		});

		res.status(200).json(article);
	}
);

handler.patch(
	session,
	hasPermission(Permission.NEWS_EDITOR),
	validate({ body: patchBodySchema, query: patchQuerySchema }),
	async (req, res) => {
		const articleId = req.query.articleId as string;

		const { article } = req.body;

		const savedArticle = await prisma.article.update({
			where: { id: articleId },
			data: article,
		});

		res.json(savedArticle);
	}
);

export default handler;
