import { Product } from '@prisma/client';
import ButtonLink from 'components/links/ButtonLink';

interface ProductRowProps {
	product: Pick<Product, 'id' | 'name' | 'price'>;
}

export default function ProductRow({ product }: ProductRowProps) {
	return (
		<tr>
			<td>{product.name}</td>
			<td>{product.price / 100} €</td>
			<td>
				<ButtonLink href={`/dashboard/shop/products/${product.id}`}>
					Modifica
				</ButtonLink>
			</td>
		</tr>
	);
}
