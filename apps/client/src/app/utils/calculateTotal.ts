import { IProduct, ProductInUserCart } from '@csl/shared';

export function calculateTotal(
	availableProducts: IProduct[],
	cart: ProductInUserCart[]
): number {
	if (cart.length === 0) {
		return 0;
	}

	const mappedCart = cart.map((product) => ({
		...product,
		...availableProducts.find((x) => x.id === product.id),
	}));

	const total = mappedCart.reduce(
		(acc, { price, quantity }) => acc + price * quantity,
		0
	);

	return total;
}
