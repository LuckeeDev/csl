import { Permission } from '@prisma/client';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const postBodySchema = Joi.object({
	name: Joi.string().required(),
	color: Joi.string()
		.regex(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)
		.required(),
});

handler.get(session, hasPermission(Permission.NEWS_EDITOR), async (_, res) => {
	const categories = await prisma.articleCategory.findMany({
		include: { _count: { select: { articles: true } } },
	});

	res.status(200).json(categories);
});

handler.post(
	session,
	hasPermission(Permission.NEWS_EDITOR),
	validate({ body: postBodySchema }),
	async (req, res) => {
		const category = await prisma.articleCategory.create({
			data: {
				name: req.body.name,
				color: req.body.color,
			},
			include: {
				_count: {
					select: { articles: true },
				},
			},
		});

		res.status(201).json(category);
	}
);

export default handler;
