import { Button } from '@mantine/core';
import { ProductDiscount } from '@prisma/client';

interface ProductDiscountRowProps {
	productDiscount: Omit<ProductDiscount, 'updated_at' | 'created_at'>;
	handleDelete: () => void;
}

export default function ProductDiscountRow({
	productDiscount,
	handleDelete,
}: ProductDiscountRowProps) {
	return (
		<tr>
			<td>{productDiscount.name}</td>
			<td>{productDiscount.discountPercentage}</td>
			<td>
				<Button color="red" onClick={handleDelete}>
					Elimina
				</Button>
			</td>
		</tr>
	);
}
