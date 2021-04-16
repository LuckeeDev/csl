import { IProduct } from '../models/product';
import { ProductInUserCart } from '../models/user';
import { reduceCart } from './reduceCart';

type CartInfo = (ProductInUserCart & {
	name: IProduct['name'];
	category: IProduct['category'];
	color: IProduct['colors'][number]['color'];
	price: number;
})[];

export function getCartInfo(
	cart: ProductInUserCart[],
	availableProducts: IProduct[]
): CartInfo {
	const reducedCart = reduceCart(cart);

	return reducedCart
		.map((product) => {
			const availableProduct = availableProducts.find(
				(x) => x.id === product.id
			);

			const selectedColor = availableProduct.colors.find(
				(x) => x.id === product.color
			);

			return {
				...product,
				category: availableProduct.category,
				name: availableProduct.name,
				price: product.discounted
					? availableProduct.price / 2
					: availableProduct.price,
				color: selectedColor.color,
			};
		});
}
