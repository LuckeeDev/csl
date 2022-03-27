import { Permission } from '@prisma/client';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(session, hasPermission(Permission.NEWS_EDITOR), async (_, res) => {
	const categories = await prisma.articleCategory.findMany({
		include: { _count: { select: { articles: true } } },
	});

	res.status(200).json(categories);
});

export default handler;
