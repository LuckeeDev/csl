import { Permission } from '@prisma/client';
import { PRODUCT_SIZES } from 'data/productSizes';
import Joi from 'joi';
import hasPermission from 'middlewares/hasPermission';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const patchBodySchema = Joi.object({
	product: Joi.object({
		name: Joi.string(),
		description: Joi.string().allow(''),
		shopSessionId: Joi.string(),
		categoryId: Joi.string(),
		colors: Joi.array().items(
			Joi.string().regex(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)
		),
		sizes: Joi.array().items(Joi.string().valid(...PRODUCT_SIZES)),
		price: Joi.number(),
		images: Joi.array().items(Joi.string()),
	}).required(),
});

const patchQuerySchema = Joi.object({ id: Joi.string().required() }).required();

const deleteQuerySchema = Joi.object({
	id: Joi.string().required(),
}).required();

handler.patch(
	session,
	hasPermission(Permission.SHOP_MANAGER),
	validate({ body: patchBodySchema, query: patchQuerySchema }),
	async (req, res) => {
		const productID = req.query.id as string;

		const {
			product: { shopSessionId, categoryId, images, ...product },
		} = req.body;

		if (product.price) {
			product.price = product.price * 100;
		}

		const savedProduct = await prisma.product.update({
			where: { id: productID },
			data: {
				...product,
				...(shopSessionId && {
					shopSession: { connect: { id: shopSessionId } },
				}),
				...(categoryId && {
					category: { connect: { id: categoryId } },
				}),
				...(images && {
					images: { connect: (images as string[]).map((id) => ({ id })) },
				}),
			},
		});

		res.json(savedProduct);
	}
);

handler.delete(
	session,
	hasPermission(Permission.SHOP_MANAGER),
	validate({ query: deleteQuerySchema }),
	async (req, res) => {
		const productId = req.query.id as string;

		await prisma.product.delete({ where: { id: productId } });

		res.status(204).end();
	}
);

export default handler;
