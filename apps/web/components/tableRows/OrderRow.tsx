import { Button } from '@mantine/core';
import { Order, Product } from '@prisma/client';
import { OmitDates } from 'types/omit';

interface OrderRowProps {
	order: OmitDates<Order & { product: OmitDates<Product> }>;
	onDelete: () => void;
	hasActions: boolean;
}

export default function OrderRow({
	order,
	onDelete,
	hasActions,
}: OrderRowProps) {
	return (
		<tr>
			<td>{order.product.name}</td>
			<td>{order.quantity}</td>
			<td>{order.size}</td>
			<td>{order.color}</td>
			<td>{(order.product.price * order.quantity) / 100}€</td>
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
