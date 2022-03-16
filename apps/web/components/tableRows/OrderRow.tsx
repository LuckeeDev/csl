import { Button } from '@mantine/core';
import { Product } from '@prisma/client';
import { OmitDates } from 'types/omit';
import { DiscountedOrder } from 'utils/shop/calculateDiscount';

interface OrderRowProps {
	order: OmitDates<DiscountedOrder & { product: OmitDates<Product> }>;
	onDelete: () => void;
	hasActions: boolean;
}

export default function OrderRow({
	order,
	onDelete,
	hasActions,
}: OrderRowProps) {
	const discounts = order.discounts ?? 0;
	const discountPercentage = order.discountPercentage ?? 0;

	return (
		<tr>
			<td>{order.product.name}</td>
			<td>{order.quantity}</td>
			<td>{order.size}</td>
			<td>{order.color}</td>
			<td>
				{discounts !== 0 && (
					<span style={{ textDecoration: 'line-through' }}>
						{(order.product.price * order.quantity) / 100}€
					</span>
				)}{' '}
				{(order.product.price * (order.quantity - discounts)) / 100 +
					(order.product.price * discounts * (discountPercentage / 100)) / 100}
				€
			</td>
			{hasActions && (
				<td>
					<Button color="red" onClick={onDelete}>
						Rimuovi
					</Button>
				</td>
			)}
		</tr>
	);
}
