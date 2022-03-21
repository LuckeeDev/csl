import {
	Button,
	Collapse,
	LoadingOverlay,
	ScrollArea,
	Space,
	Table,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { ProductCategory } from '@prisma/client';
import axios from 'axios';
import ProductCategoryForm from 'components/forms/ProductCategoryForm';
import PageTitle from 'components/head/PageTitle';
import ProductCategoryRow from 'components/productCategories/ProductCategoryRow';
import { environment } from 'environments/environment';
import useProductCategoryForm, {
	ProductCategoryFormValues,
} from 'hooks/forms/useProductCategoryForm';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { useCallback, useMemo, useState } from 'react';
import { BasePageProps } from 'types/pages';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';

interface DashboardShopCategoriesProps extends BasePageProps {
	productCategories: Omit<ProductCategory, 'updated_at' | 'created_at'>[];
}

function DashboardShopCategories({
	productCategories,
}: DashboardShopCategoriesProps) {
	const [categories, setCategories] = useState(productCategories);
	const [open, setOpen] = useState(false);
	const [overlay, setOverlay] = useState(false);
	const notifications = useNotifications();
	const form = useProductCategoryForm();

	const handleDelete = useCallback(
		async (productCategoryId: ProductCategory['id']) => {
			try {
				setOverlay(true);

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
					icon: <CheckIcon />,
				});

				setOverlay(false);
			} catch (err) {
				notifications.showNotification({
					title: 'Errore',
					message: 'Non è stato possibile eliminare questa categoria',
					color: 'red',
					icon: <Cross1Icon />,
				});

				setOverlay(false);
			}
		},
		[setCategories, notifications]
	);

	async function onSubmit(val: ProductCategoryFormValues) {
		try {
			setOverlay(true);

			const { data } = await axios.post<ProductCategory>(
				`${environment.url}/api/shop/categories`,
				{ productCategory: val },
				{ withCredentials: true }
			);

			setCategories((elements) => [...elements, data]);

			form.reset();

			notifications.showNotification({
				title: 'Operazione completata',
				message: 'Categoria creata correttamente',
				color: 'teal',
				icon: <CheckIcon />,
			});

			setOverlay(false);
		} catch (err) {
			notifications.showNotification({
				title: 'Errore',
				message: 'Non è stato possibile creare questa categoria',
				color: 'red',
				icon: <Cross1Icon />,
			});

			setOverlay(false);
		}
	}

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
		<DashboardPageContainer>
			<PageTitle>Categorie | Dashboard</PageTitle>

			<h1>Categorie</h1>

			<LoadingOverlay visible={overlay} />

			<ScrollArea>
				<Table sx={{ minWidth: 400 }}>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Azioni</th>
						</tr>
					</thead>

					<tbody>{rows}</tbody>
				</Table>
			</ScrollArea>

			<Space h={20} />

			<Button onClick={() => setOpen(!open)}>
				{open ? 'Chiudi' : 'Crea categoria'}
			</Button>

			<Space h={20} />

			<Collapse in={open} transitionDuration={0}>
				<ProductCategoryForm form={form} onSubmit={onSubmit} />
			</Collapse>
		</DashboardPageContainer>
	);
}

DashboardShopCategories.hasSidebar = true;
DashboardShopCategories.sidebarLinks = SHOP_LINKS;

export default DashboardShopCategories;

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
