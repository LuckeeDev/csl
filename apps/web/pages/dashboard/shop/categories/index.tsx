import { Table } from '@mantine/core';
import { ProductCategory } from '@prisma/client';
import PageTitle from 'components/head/PageTitle';
import ProductCategoryRow from 'components/productCategories/ProductCategoryRow';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { BasePageProps } from 'types/pages';

interface DashboardShopCategoriesProps extends BasePageProps {
	productCategories: Omit<ProductCategory, 'updated_at' | 'created_at'>[];
}

export default function DashboardShopCategories({
	productCategories,
}: DashboardShopCategoriesProps) {
	const rows = productCategories.map((element) => (
		<ProductCategoryRow key={element.id} productCategory={element} />
	));

	return (
		<div>
			<PageTitle>Categorie | Dashboard</PageTitle>

			<h1>Categorie</h1>

			<Table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Azioni</th>
					</tr>
				</thead>

				<tbody>{rows}</tbody>
			</Table>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<
	DashboardShopCategoriesProps
> = async (ctx) => {
	const session = await getSession(ctx);

	const productCategories = await prisma.productCategory.findMany({
		select: { id: true, name: true },
	});

	return {
		props: {
			session,
			productCategories,
			hasSidebar: true,
			sidebarLinks: SHOP_LINKS,
		},
	};
};
