import { Button } from '@mantine/core';
import { Product } from '@prisma/client';
import ButtonLink from 'components/links/ButtonLink';

interface ProductRowProps {
	product: Pick<Product, 'id' | 'name' | 'price'>;
	handleDelete: () => void;
}

export default function ProductRow({ product, handleDelete }: ProductRowProps) {
	return (
		<tr>
			<td>{product.name}</td>
			<td>{product.price / 100} €</td>
			<td>
				<ButtonLink href={`/dashboard/shop/products/${product.id}`}>
					Modifica
				</ButtonLink>

				<Button ml={20} color="red" onClick={handleDelete}>
					Elimina
				</Button>
			</td>
		</tr>
	);
}
