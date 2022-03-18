import { Button, useMantineTheme } from '@mantine/core';
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
	const theme = useMantineTheme();

	return (
		<tr>
			<td>{order.product.name}</td>
			<td>{order.quantity}</td>
			<td>{order.size}</td>
			<td>{order.color && <ColorBlock color={order.color} />}</td>
			<td style={{ color: theme.colors.teal[5] }}>
				{order.oldCost && (
					<span
						style={{
							textDecoration: 'line-through',
							color: theme.colors.red[5],
						}}
					>
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
