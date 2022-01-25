import { getServerSession } from 'next-auth';
import connect from 'next-connect';
import { nextAuthOptions } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import joi from 'joi';
import validate from 'middlewares/validate';
import prisma from 'prisma/client';

const postBodySchema = joi.object({
	article: joi.object({
		title: joi.string().required(),
		content: joi.string().required(),
		author: joi.string().required(),
		readingTime: joi.number().required(),
	}),
});

const patchQuerySchema = joi.object({
	articles: joi.array().length(1).items(joi.string()),
});

interface HandlerRequest extends NextApiRequest {
	body: { article: number };
}

const handler = connect<HandlerRequest, NextApiResponse>();

handler.post(validate({ body: postBodySchema }), async (req, res) => {
	const {
		user: { roles },
	} = await getServerSession({ req, res }, nextAuthOptions);

	const roleIDs = roles.map(({ id }) => id);

	if (roleIDs.includes('IS_EDITOR')) {
		const { article } = req.body;

		const savedArticle = await prisma.article.create({ data: article });

		res.json(savedArticle);
	} else {
		res.status(401).end();
	}
});

handler.patch(
	validate({ body: postBodySchema, query: patchQuerySchema }),
	async (req, res) => {
		// Because of how Next routing works, this parameter will be under the
		// "articles" array field. We need to access the first element.
		const articleID = req.query.articles[0];

		const {
			user: { roles },
		} = await getServerSession({ req, res }, nextAuthOptions);

		const roleIDs = roles.map(({ id }) => id);

		if (roleIDs.includes('IS_EDITOR')) {
			const { article } = req.body;

			const savedArticle = await prisma.article.update({
				where: { id: articleID },
				data: article,
			});

			res.json(savedArticle);
		} else {
			res.status(401).end();
		}
	}
);

export default handler;
