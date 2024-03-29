import {
	ActionIcon,
	Input,
	LoadingOverlay,
	ScrollArea,
	Table,
	TextInput,
	createStyles,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ProductCategory } from '@prisma/client';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import ProductCategoryRow from 'components/productCategories/ProductCategoryRow';
import { environment } from 'environments/environment';
import useProductCategoryForm, {
	ProductCategoryFormValues,
} from 'hooks/forms/useProductCategoryForm';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import { useCallback, useMemo, useState } from 'react';

interface DashboardShopCategoriesProps {
	productCategories: Omit<ProductCategory, 'updated_at' | 'created_at'>[];
}

const useStyles = createStyles((theme) => ({
	textInput: {
		[`@media (max-width: ${theme.breakpoints.md})`]: {
			maxWidth: '300px',
		},
	},
}));

function DashboardShopCategories({
	productCategories,
}: DashboardShopCategoriesProps) {
	const { classes } = useStyles();
	const [categories, setCategories] = useState(productCategories);
	const [overlay, setOverlay] = useState(false);
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

				showNotification({
					title: 'Operazione completata',
					message: 'Categoria eliminata correttamente',
					color: 'teal',
					icon: <IconCheck />,
				});

				setOverlay(false);
			} catch (err) {
				showNotification({
					title: 'Errore',
					message: 'Non è stato possibile eliminare questa categoria',
					color: 'red',
					icon: <IconX />,
				});

				setOverlay(false);
			}
		},
		[setCategories]
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

			showNotification({
				title: 'Operazione completata',
				message: 'Categoria creata correttamente',
				color: 'teal',
				icon: <IconCheck />,
			});

			setOverlay(false);
		} catch (err) {
			showNotification({
				title: 'Errore',
				message: 'Non è stato possibile creare questa categoria',
				color: 'red',
				icon: <IconX />,
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

					<tbody>
						{rows}
						<tr>
							<td>
								<form onSubmit={form.onSubmit(onSubmit)}>
									<Input.Wrapper label="Nuova categoria">
										<TextInput
											className={classes.textInput}
											placeholder="Inserisci un nome per la nuova categoria"
											{...form.getInputProps('name')}
											rightSection={
												<ActionIcon type="submit" color="blue" variant="filled">
													<IconCheck />
												</ActionIcon>
											}
										/>
									</Input.Wrapper>
								</form>
							</td>
						</tr>
					</tbody>
				</Table>
			</ScrollArea>
		</DashboardPageContainer>
	);
}

DashboardShopCategories.hasSidebar = true;
DashboardShopCategories.sidebarLinks = SHOP_LINKS;

export default DashboardShopCategories;

export const getServerSideProps: GetServerSideProps<
	DashboardShopCategoriesProps
> = async () => {
	const productCategories = await prisma.productCategory.findMany({
		select: { id: true, name: true },
	});

	return {
		props: {
			productCategories,
			hasSidebar: true,
			sidebarLinks: SHOP_LINKS,
		},
	};
};
