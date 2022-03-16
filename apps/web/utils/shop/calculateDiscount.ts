import { Order, Product, ProductDiscount } from '@prisma/client';
import { OmitDates } from 'types/omit';

export interface DiscountedOrder extends Order {
	discounts?: number;
	discountPercentage?: number;
}

export default function calculateDiscount(
	discounts: OmitDates<ProductDiscount>[],
	orders: (OmitDates<DiscountedOrder> & { product: OmitDates<Product> })[]
) {
	// Re-order orders in a descending price order. This way, discounts will be applied
	// to the most expensive items.
	const descPriceOrders = orders.sort(
		(a, b) => a.product.price - b.product.price
	);

	for (const discount of discounts) {
		// Count how many required products the user has ordered
		const requiredQuantity = orders
			.filter(
				(order) => order.product.categoryId === discount.requiredCategoryId
			)
			.reduce((previous, current) => previous + current.quantity, 0);

		// Calculate the maximum allowed discounted quantity
		let availableDiscounts = Math.floor(
			requiredQuantity / discount.requiredQuantity
		);

		for (let x = 0; x < availableDiscounts; x++) {
			// Find the first element of the array that belongs to the discounted category
			// and that has less discounts than its total quantity
			const index = descPriceOrders.findIndex(
				(order) =>
					order.product.categoryId === discount.discountedCategoryId &&
					(!order.discounts || order.discounts < order.quantity)
			);

			// Apply all discounts if the quantity is higher than the available discounts
			if (descPriceOrders[index].quantity >= availableDiscounts) {
				descPriceOrders[index].discounts = availableDiscounts;
				descPriceOrders[index].discountPercentage = discount.discountPercentage;

				availableDiscounts = 0;
			} else {
				// Apply discount to all products of this order
				descPriceOrders[index].discounts = descPriceOrders[index].quantity;
				descPriceOrders[index].discountPercentage = discount.discountPercentage;

				availableDiscounts =
					availableDiscounts - descPriceOrders[index].quantity;
			}
		}
	}

	return descPriceOrders;
}
