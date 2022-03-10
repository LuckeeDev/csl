import { Button, Collapse, LoadingOverlay, Space, Table } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { ProductCategory, ProductDiscount, ShopSession } from '@prisma/client';
import PageTitle from 'components/head/PageTitle';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { useMemo, useState } from 'react';
import { BasePageProps } from 'types/pages';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import ProductDiscountForm from 'components/forms/ProductDiscountForm';
import useProductDiscountForm, {
	ProductDiscountFormValues,
} from 'hooks/useProductDiscountForm';
import ProductDiscountRow from 'components/tableRows/ProductDiscountRow';
import axios from 'axios';
import { environment } from 'environments/environment';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';

interface DashboardShopDiscountsProps extends BasePageProps {
	productDiscounts: Omit<ProductDiscount, 'updated_at' | 'created_at'>[];
	shopSessions: Pick<ShopSession, 'id' | 'name'>[];
	productCategories: Pick<ProductCategory, 'id' | 'name'>[];
}

function DashboardShopDiscounts({
	productDiscounts,
	shopSessions,
	productCategories,
}: DashboardShopDiscountsProps) {
	const [discounts, setDiscounts] = useState(productDiscounts);
	const [open, setOpen] = useState(false);
	const [overlay, setOverlay] = useState(false);
	const notifications = useNotifications();
	const form = useProductDiscountForm();

	// const handleDelete = useCallback(
	// 	async (productCategoryId: ProductCategory['id']) => {
	// 		try {
	// 			await axios.delete(
	// 				`${environment.url}/api/shop/categories/${productCategoryId}`
	// 			);

	// 			setCategories((elements) => {
	// 				const index = elements.findIndex((e) => e.id === productCategoryId);

	// 				elements.splice(index, 1);

	// 				return elements;
	// 			});

	// 			notifications.showNotification({
	// 				title: 'Operazione completata',
	// 				message: 'Categoria eliminata correttamente',
	// 				color: 'teal',
	// 				icon: <CheckIcon />,
	// 			});
	// 		} catch (err) {
	// 			notifications.showNotification({
	// 				title: 'Errore',
	// 				message: 'Non è stato possibile eliminare questa categoria',
	// 				color: 'red',
	// 				icon: <Cross1Icon />,
	// 			});
	// 		}
	// 	},
	// 	[setCategories, notifications]
	// );

	async function onSubmit(val: ProductDiscountFormValues) {
		try {
			setOverlay(true);

			const { data } = await axios.post<ProductDiscount>(
				`${environment.url}/api/shop/discounts`,
				{ productDiscount: val }
			);

			setDiscounts((elements) => [...elements, data]);

			form.reset();

			notifications.showNotification({
				title: 'Operazione completata con successo',
				message: 'Lo sconto è attivo sulla sessione di vendita selezionata',
				color: 'teal',
				icon: <CheckIcon />,
			});

			setOverlay(false);
		} catch (err) {
			notifications.showNotification({
				title: 'Errore',
				message: 'Non è stato possibile creare questo sconto',
				color: 'red',
				icon: <Cross1Icon />,
			});

			setOverlay(false);
		}
	}

	const rows = useMemo(
		() =>
			discounts.map((element) => (
				<ProductDiscountRow key={element.id} productDiscount={element} />
			)),
		[discounts]
	);

	return (
		<DashboardPageContainer>
			<PageTitle>Sconti | Dashboard</PageTitle>

			<LoadingOverlay visible={overlay} />

			<h1>Sconti</h1>

			<Table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Azioni</th>
					</tr>
				</thead>

				<tbody>{rows}</tbody>
			</Table>

			<Space h={20} />

			<Button onClick={() => setOpen(!open)}>
				{open ? 'Chiudi' : 'Crea sconto'}
			</Button>

			<Space h={20} />

			<Collapse in={open} transitionDuration={0}>
				<ProductDiscountForm
					form={form}
					onSubmit={onSubmit}
					shopSessions={shopSessions}
					productCategories={productCategories}
				/>
			</Collapse>
		</DashboardPageContainer>
	);
}

DashboardShopDiscounts.hasSidebar = true;
DashboardShopDiscounts.sidebarLinks = SHOP_LINKS;

export default DashboardShopDiscounts;

export const getServerSideProps: GetServerSideProps<
	DashboardShopDiscountsProps
> = async (ctx) => {
	const session = await getSession(ctx);

	const productDiscounts = await prisma.productDiscount.findMany();

	const shopSessions = await prisma.shopSession.findMany({
		select: { id: true, name: true },
	});
	const productCategories = await prisma.productCategory.findMany({
		select: { id: true, name: true },
	});

	return {
		props: {
			session,
			productDiscounts: productDiscounts.map(
				({ updated_at, created_at, ...c }) => c
			),
			shopSessions,
			productCategories,
			hasSidebar: true,
			sidebarLinks: SHOP_LINKS,
		},
	};
};
