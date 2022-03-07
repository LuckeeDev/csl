import { ProductSize } from '@prisma/client';
import { PRODUCT_SIZES } from 'data/productSizes';

export default function sortSizes(sizes: ProductSize[]) {
	return sizes.sort((a, b) => {
		const indexA = PRODUCT_SIZES.findIndex((s) => s === a);
		const indexB = PRODUCT_SIZES.findIndex((s) => s === b);

		return indexA - indexB;
	});
}
