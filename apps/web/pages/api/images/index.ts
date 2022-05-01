import { Permission } from '@prisma/client';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(
	session,
	hasPermission(Permission.NEWS_EDITOR),
	async (req, res) => {
		const images = await prisma.image.findMany();

		res.json(images);
	}
);

export default handler;
