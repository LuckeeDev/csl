import { Table } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { ProductCategory } from '@prisma/client';
import axios from 'axios';
import PageTitle from 'components/head/PageTitle';
import ProductCategoryRow from 'components/productCategories/ProductCategoryRow';
import { environment } from 'environments/environment';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { useCallback, useMemo, useState } from 'react';
import { BasePageProps } from 'types/pages';

interface DashboardShopCategoriesProps extends BasePageProps {
	productCategories: Omit<ProductCategory, 'updated_at' | 'created_at'>[];
}

export default function DashboardShopCategories({
	productCategories,
}: DashboardShopCategoriesProps) {
	const [categories, setCategories] = useState(productCategories);
	const notifications = useNotifications();

	const handleDelete = useCallback(
		async (productCategoryId: ProductCategory['id']) => {
			try {
				await axios.delete(
					`${environment.url}/api/shop/categories/${productCategoryId}`
				);

				setCategories((elements) => {
					const index = elements.findIndex((e) => e.id === productCategoryId);

					elements.splice(index, 1);

					return elements;
				});

				notifications.showNotification({
					title: 'Operazione completata',
					message: 'Categoria eliminata correttamente',
					color: 'teal',
				});
			} catch (err) {
				notifications.showNotification({
					title: 'Errore',
					message: 'Non è stato possibile eliminare questa categoria',
					color: 'red',
				});
			}
		},
		[setCategories, notifications]
	);

	const rows = useMemo(
		() =>
			categories.map((element) => (
				<ProductCategoryRow
					key={element.id}
					productCategory={element}
					handleDelete={() => handleDelete(element.id)}
				/>
			)),
		[categories, handleDelete]
	);

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
