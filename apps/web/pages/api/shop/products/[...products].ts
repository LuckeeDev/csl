import { Permission } from '@prisma/client';
import { PRODUCT_SIZES } from 'data/productSizes';
import joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';
import sortSizes from 'utils/sortSizes';

const postBodySchema = joi.object({
	product: joi
		.object({
			name: joi.string().required(),
			description: joi.string().allow(''),
			shopSessionId: joi.string().required(),
			categoryId: joi.string().required(),
			colors: joi
				.array()
				.items(joi.string().regex(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)),
			sizes: joi.array().items(joi.string().valid(...PRODUCT_SIZES)),
			price: joi.number().required(),
		})
		.required(),
});

// const patchBodySchema = joi.object({
// 	shopSession: joi.object({
// 		name: joi.string(),
// 		start: joi.date(),
// 		end: joi.date(),
// 	}),
// });

// const patchQuerySchema = joi.object({
// 	shop: joi.array().length(1).items(joi.string()),
// });

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
			},
		});

		res.json(savedProduct);
	}
);

// handler.patch(
// 	session,
// 	hasPermission(Permission.SHOP_MANAGER),
// 	validate({ body: patchBodySchema, query: patchQuerySchema }),
// 	async (req, res) => {
// 		const shopSessionID = req.query.shop[0];

// 		const { shopSession } = req.body;

// 		const savedShopSession = await prisma.shopSession.update({
// 			where: { id: shopSessionID },
// 			data: shopSession,
// 		});

// 		res.json(savedShopSession);
// 	}
// );

export default handler;
