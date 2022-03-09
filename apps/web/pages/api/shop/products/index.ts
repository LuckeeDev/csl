import { Permission } from '@prisma/client';
import { PRODUCT_SIZES } from 'data/productSizes';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';
import sortSizes from 'utils/sortSizes';

const postBodySchema = Joi.object({
	product: Joi.object({
		name: Joi.string().required(),
		description: Joi.string().allow(''),
		shopSessionId: Joi.string().required(),
		categoryId: Joi.string().required(),
		colors: Joi.array().items(
			Joi.string().regex(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)
		),
		sizes: Joi.array().items(Joi.string().valid(...PRODUCT_SIZES)),
		price: Joi.number().required(),
		images: Joi.array().items(Joi.string()),
	}).required(),
});

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(
	session,
	hasPermission(Permission.SHOP_MANAGER),
	validate({ body: postBodySchema }),
	async (req, res) => {
		const { product } = req.body;

		const sortedSizes = product.sizes ? sortSizes(product.sizes) : [];
		const price = product.price * 100;

		const savedProduct = await prisma.product.create({
			data: {
				name: product.name,
				description: product.description,
				price: price,
				sizes: sortedSizes,
				colors: product.colors,
				shopSession: {
					connect: {
						id: product.shopSessionId,
					},
				},
				category: {
					connect: {
						id: product.categoryId,
					},
				},
				images: {
					connect: (product.images as string[]).map((id) => ({ id })),
				},
			},
		});

		res.json(savedProduct);
	}
);

export default handler;
