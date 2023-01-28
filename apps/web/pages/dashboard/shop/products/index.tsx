import { Table, ScrollArea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Product } from '@prisma/client';
import axios from 'axios';
import PageTitle from 'components/head/PageTitle';
import ProductRow from 'components/products/ProductRow';
import { environment } from 'environments/environment';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';

interface DashboardShopProductsProps {
	products: Pick<Product, 'id' | 'name' | 'price'>[];
}

function DashboardShopProducts({
	products: serverSideProducts,
}: DashboardShopProductsProps) {
	const [products, setProducts] = useState(serverSideProducts);

	async function handleDelete(productId: Product['id']) {
		try {
			await axios.delete(`${environment.url}/api/shop/products/${productId}`);

			setProducts((elements) => {
				const index = elements.findIndex((e) => e.id === productId);

				elements.splice(index, 1);

				return elements;
			});

			showNotification({
				title: 'Operazione completata',
				message: 'Prodotto eliminato correttamente',
				color: 'teal',
				icon: <IconCheck />,
			});
		} catch (err) {
			showNotification({
				title: 'Errore',
				message: 'Non è stato possibile eliminare questo prodotto',
				color: 'red',
				icon: <IconX />,
			});
		}
	}

	const rows = products.map((element) => (
		<ProductRow
			key={element.id}
			product={element}
			handleDelete={() => handleDelete(element.id)}
		/>
	));

	return (
		<DashboardPageContainer>
			<PageTitle>Prodotti | Dashboard</PageTitle>

			<h1>Prodotti</h1>

			<ScrollArea>
				<Table sx={{ minWidth: 800 }}>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Prezzo</th>
							<th>Azioni</th>
						</tr>
					</thead>

					<tbody>{rows}</tbody>
				</Table>
			</ScrollArea>
		</DashboardPageContainer>
	);
}

DashboardShopProducts.hasSidebar = true;
DashboardShopProducts.sidebarLinks = SHOP_LINKS;

export default DashboardShopProducts;

export const getServerSideProps: GetServerSideProps<
	DashboardShopProductsProps
> = async () => {
	const products = await prisma.product.findMany({
		select: { id: true, name: true, price: true },
	});

	return {
		props: {
			products,
		},
	};
};
