import { Document } from 'mongoose';

export type TSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export class ProductOptions {
	id: string;
	quantity: number;
	color?: string;
	size?: TSize;
}

interface Color {
	color: string;
	id: string;
}

export interface IProduct {
	id: string;
	name: string;
	description: string;
	category: 'gadgets' | 'photos';
	price: number;
	fileNames: string[];
	stripeID: string;
	stripePriceID: string;
	colors?: Color[];
	sizes?: TSize[];

	/**
	 * Only needed in client, to show the user previews
	 * of the product
	 */
	previewLinks?: string[];
}

export interface IProductModel extends Document, IProduct {
	id: string;
}
