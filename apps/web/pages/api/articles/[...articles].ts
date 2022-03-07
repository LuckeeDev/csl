import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import joi from 'joi';
import validate from 'middlewares/validate';
import prisma from 'prisma/client';
import session from 'middlewares/session';
import hasPermission from 'middlewares/hasPermission';
import { Permission } from '@prisma/client';

const postBodySchema = joi.object({
	article: joi
		.object({
			title: joi.string().required(),
			content: joi.string().required(),
			author: joi.string().required(),
			readingTime: joi.number().required(),
		})
		.required(),
});

const patchBodySchema = joi.object({
	article: joi
		.object({
			title: joi.string(),
			content: joi.string(),
			author: joi.string(),
			readingTime: joi.number(),
			published: joi.boolean(),
		})
		.required(),
});

const patchQuerySchema = joi.object({
	articles: joi.array().length(1).items(joi.string()).required(),
});

const handler = connect<NextApiRequest, NextApiResponse>();

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

handler.patch(
	session,
	hasPermission(Permission.NEWS_EDITOR),
	validate({ body: patchBodySchema, query: patchQuerySchema }),
	async (req, res) => {
		// Because of how Next routing works, this parameter will be under the
		// "articles" array field. We need to access the first element.
		const articleID = req.query.articles[0];

		const { article } = req.body;

		const savedArticle = await prisma.article.update({
			where: { id: articleID },
			data: article,
		});

		res.json(savedArticle);
	}
);

export default handler;
