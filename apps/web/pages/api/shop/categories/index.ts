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
	productCategory: Joi.object({
		name: Joi.string().required(),
	}).required(),
}).required();

handler.post(
	session,
	hasPermission(Permission.SHOP_MANAGER),
	validate({ body: postBodySchema }),
	async (req, res) => {
		const { productCategory } = req.body;

		const savedProductCategory = await prisma.productCategory.create({
			data: productCategory,
		});

		res.status(201).json(savedProductCategory);
	}
);

export default handler;
