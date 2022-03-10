import { Button } from '@mantine/core';
import { ProductDiscount } from '@prisma/client';

interface ProductDiscountRowProps {
	productDiscount: Omit<ProductDiscount, 'updated_at' | 'created_at'>;
}

export default function ProductDiscountRow({
	productDiscount,
}: ProductDiscountRowProps) {
	return (
		<tr>
			<td>{productDiscount.name}</td>
			<td>
				<Button color="red">Elimina</Button>
			</td>
		</tr>
	);
}
