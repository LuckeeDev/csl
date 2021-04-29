import { ProductInUserCart } from '../models/user';

type ReducedCart = (ProductInUserCart & {
	discounted: boolean;
})[];

export function reduceCart(cart: ProductInUserCart[]): ReducedCart {
	return cart.reduce((acc, product: ProductInUserCart) => {
		if (product.bundled) {
			const { bundled, ...newProduct } = product;

			return [
				...acc,
				{ ...newProduct, discounted: false },
				{ ...bundled, discounted: true },
			];
		} else {
			return [...acc, { ...product, discounted: false }];
		}
	}, []);
}
