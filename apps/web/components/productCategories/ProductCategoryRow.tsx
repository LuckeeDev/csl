import { Button } from '@mantine/core';
import { ProductCategory } from '@prisma/client';

interface ProductCategoryRowProps {
	productCategory: Omit<ProductCategory, 'updated_at' | 'created_at'>;
}

export default function ProductCategoryRow({
	productCategory,
}: ProductCategoryRowProps) {
	return (
		<tr>
			<td>{productCategory.name}</td>
			<td>
				<Button color="red">Elimina</Button>
			</td>
		</tr>
	);
}
