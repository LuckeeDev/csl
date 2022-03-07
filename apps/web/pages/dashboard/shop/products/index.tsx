import { Table } from '@mantine/core';
import { Product } from '@prisma/client';
import PageTitle from 'components/head/PageTitle';
import ProductRow from 'components/products/ProductRow';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { BasePageProps } from 'types/pages';

interface DashboardShopProductsProps extends BasePageProps {
	products: Pick<Product, 'id' | 'name' | 'price'>[];
}

export default function DashboardShopProducts({
	products,
}: DashboardShopProductsProps) {
	const rows = products.map((element) => (
		<ProductRow key={element.id} product={element} />
	));

	return (
		<div>
			<PageTitle>Prodotti | Dashboard</PageTitle>

			<h1>Prodotti</h1>

			<Table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Prezzo</th>
						<th>Azioni</th>
					</tr>
				</thead>

				<tbody>{rows}</tbody>
			</Table>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<DashboardShopProductsProps> =
	async (ctx) => {
		const session = await getSession(ctx);

		const products = await prisma.product.findMany({
			select: { id: true, name: true, price: true },
		});

		return {
			props: {
				session,
				products,
				hasSidebar: true,
				sidebarLinks: SHOP_LINKS,
			},
		};
	};
