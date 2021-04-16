import { ProductInUserCart } from '../models/user';

type ReducedCart = (ProductInUserCart & {
	discounted: boolean;
})[];

export function reduceCart(cart: ProductInUserCart[]): ReducedCart {
	return cart.reduce((acc, product: ProductInUserCart) => {
		if (product.bundled) {
			const bundled = product.bundled;

			return [
				...acc,
				{ ...product, discounted: false },
				{ ...bundled, discounted: true },
			];
		} else {
			return [...acc, { ...product, discounted: false }];
		}
	}, []);
}
