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
	productDiscount: Joi.object({
		name: Joi.string().required(),
		shopSessionId: Joi.string().required(),
		discountPercentage: Joi.number().integer().required(),
		requiredCategoryId: Joi.string().required(),
		requiredQuantity: Joi.number().integer().required(),
		discountedCategoryId: Joi.string().required(),
		discountedQuantity: Joi.number().integer().required(),
	}).required(),
}).required();

handler.post(
	session,
	hasPermission(Permission.SHOP_MANAGER),
	validate({ body: postBodySchema }),
	async (req, res) => {
		const {
			productDiscount: {
				shopSessionId,
				requiredCategoryId,
				discountedCategoryId,
				...data
			},
		} = req.body;

		const savedProductDiscount = await prisma.productDiscount.create({
			data: {
				shopSession: {
					connect: {
						id: shopSessionId,
					},
				},
				requiredCategory: {
					connect: {
						id: requiredCategoryId,
					},
				},
				discountedCategory: {
					connect: {
						id: discountedCategoryId,
					},
				},
				...data,
			},
		});

		res.status(201).json(savedProductDiscount);
	}
);

export default handler;
