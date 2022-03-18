import { Button } from '@mantine/core';
import { CalculateDiscountResult } from 'utils/shop/calculateDiscount';
import ColorBlock from './ColorBlock';

interface OrderRowProps {
	order: CalculateDiscountResult;
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
			<td>{order.color && <ColorBlock color={order.color} />}</td>
			<td>
				{order.oldCost && (
					<span style={{ textDecoration: 'line-through' }}>
						{order.oldCost}€
					</span>
				)}{' '}
				{order.cost}€
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
