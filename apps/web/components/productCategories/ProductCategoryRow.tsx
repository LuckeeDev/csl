import { Button } from '@mantine/core';
import { ProductCategory } from '@prisma/client';

interface ProductCategoryRowProps {
	productCategory: Omit<ProductCategory, 'updated_at' | 'created_at'>;
	handleDelete: () => void;
}

export default function ProductCategoryRow({
	productCategory,
	handleDelete,
}: ProductCategoryRowProps) {
	return (
		<tr>
			<td>{productCategory.name}</td>
			<td>
				<Button color="red" onClick={handleDelete}>
					Elimina
				</Button>
			</td>
		</tr>
	);
}
