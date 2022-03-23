import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'Joi';
import validate from 'middlewares/validate';
import prisma from 'prisma/client';
import session from 'middlewares/session';
import hasPermission from 'middlewares/hasPermission';
import { Permission } from '@prisma/client';

const postBodySchema = Joi.object({
	article: Joi.object({
		title: Joi.string().required(),
		content: Joi.string().required(),
		author: Joi.string().required(),
		readingTime: Joi.number().required(),
	}).required(),
});

const handler = connect<NextApiRequest, NextApiResponse>();

handler.get(
	session,
	hasPermission(Permission.NEWS_EDITOR),
	async (req, res) => {
		const articles = await prisma.article.findMany();

		res.status(200).json(articles);
	}
);

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
