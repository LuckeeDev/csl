import { Table, ScrollArea } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { Product } from '@prisma/client';
import axios from 'axios';
import PageTitle from 'components/head/PageTitle';
import ProductRow from 'components/products/ProductRow';
import { environment } from 'environments/environment';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { useState } from 'react';
import { BasePageProps } from 'types/pages';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';

interface DashboardShopProductsProps extends BasePageProps {
	products: Pick<Product, 'id' | 'name' | 'price'>[];
}

function DashboardShopProducts({
	products: serverSideProducts,
}: DashboardShopProductsProps) {
	const [products, setProducts] = useState(serverSideProducts);
	const notifications = useNotifications();

	async function handleDelete(productId: Product['id']) {
		try {
			await axios.delete(`${environment.url}/api/shop/products/${productId}`);

			setProducts((elements) => {
				const index = elements.findIndex((e) => e.id === productId);

				elements.splice(index, 1);

				return elements;
			});

			notifications.showNotification({
				title: 'Operazione completata',
				message: 'Prodotto eliminato correttamente',
				color: 'teal',
				icon: <CheckIcon />,
			});
		} catch (err) {
			notifications.showNotification({
				title: 'Errore',
				message: 'Non è stato possibile eliminare questo prodotto',
				color: 'red',
				icon: <Cross1Icon />,
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
> = async (ctx) => {
	const session = await getSession(ctx);

	const products = await prisma.product.findMany({
		select: { id: true, name: true, price: true },
	});

	return {
		props: {
			session,
			products,
		},
	};
};
