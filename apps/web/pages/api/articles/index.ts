import { getServerSession } from 'next-auth';
import connect from 'next-connect';
import { nextAuthOptions } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import joi from 'joi';
import validate from 'middlewares/validate';
import prisma from 'prisma/client';

const postSchema = joi.object({
	article: joi.object({
		title: joi.string().required(),
		content: joi.string().required(),
		author: joi.string().required(),
		readingTime: joi.number().required(),
	}),
});

interface HandlerRequest extends NextApiRequest {
	body: { article: number };
}

const handler = connect<HandlerRequest, NextApiResponse>();

handler.post(validate({ body: postSchema }), async (req, res) => {
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

export default handler;
