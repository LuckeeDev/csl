import { model, Schema } from 'mongoose';
import { IProductModel } from '@csl/shared';

const ProductSchema = new Schema(
	{
		id: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		category: { type: String, required: true },
		price: { type: Number, required: true },
		fileNames: { type: Array, required: true },
		stripeID: { type: String, required: true },
		colors: { type: Array },
		sizes: { type: Array },
	},
	{ versionKey: false }
);

export const Product = model<IProductModel>('product', ProductSchema);
