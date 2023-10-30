import {
	Button,
	Collapse,
	LoadingOverlay,
	ScrollArea,
	Space,
	Table,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ProductCategory, ProductDiscount, ShopSession } from '@prisma/client';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import ProductDiscountForm from 'components/forms/ProductDiscountForm';
import PageTitle from 'components/head/PageTitle';
import ProductDiscountRow from 'components/tableRows/ProductDiscountRow';
import { environment } from 'environments/environment';
import useProductDiscountForm, {
	ProductDiscountFormValues,
} from 'hooks/forms/useProductDiscountForm';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import { useCallback, useMemo, useState } from 'react';

interface DashboardShopDiscountsProps {
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
	const form = useProductDiscountForm();

	const handleDelete = useCallback(
		async (productDiscountId: ProductCategory['id']) => {
			try {
				setOverlay(true);

				await axios.delete(
					`${environment.url}/api/shop/discounts/${productDiscountId}`
				);

				setDiscounts((elements) => {
					const index = elements.findIndex((e) => e.id === productDiscountId);

					elements.splice(index, 1);

					return elements;
				});

				showNotification({
					title: 'Operazione completata',
					message: 'Sconto eliminato correttamente',
					color: 'teal',
					icon: <IconCheck />,
				});

				setOverlay(false);
			} catch (err) {
				showNotification({
					title: 'Errore',
					message: 'Non è stato possibile eliminare questo sconto',
					color: 'red',
					icon: <IconX />,
				});

				setOverlay(false);
			}
		},
		[setDiscounts]
	);

	async function onSubmit(val: ProductDiscountFormValues) {
		try {
			setOverlay(true);

			const { data } = await axios.post<ProductDiscount>(
				`${environment.url}/api/shop/discounts`,
				{ productDiscount: val }
			);

			setDiscounts((elements) => [...elements, data]);

			form.reset();

			showNotification({
				title: 'Operazione completata con successo',
				message: 'Lo sconto è attivo sulla sessione di vendita selezionata',
				color: 'teal',
				icon: <IconCheck />,
			});

			setOverlay(false);
		} catch (err) {
			showNotification({
				title: 'Errore',
				message: 'Non è stato possibile creare questo sconto',
				color: 'red',
				icon: <IconX />,
			});

			setOverlay(false);
		}
	}

	const rows = useMemo(
		() =>
			discounts.map((element) => (
				<ProductDiscountRow
					key={element.id}
					productDiscount={element}
					handleDelete={() => handleDelete(element.id)}
				/>
			)),
		[discounts, handleDelete]
	);

	return (
		<DashboardPageContainer>
			<PageTitle>Sconti | Dashboard</PageTitle>

			<LoadingOverlay visible={overlay} />

			<h1>Sconti</h1>

			<ScrollArea>
				<Table style={{ minWidth: 800 }}>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Nome</Table.Th>
							<Table.Th>Sconto</Table.Th>
							<Table.Th>Azioni</Table.Th>
						</Table.Tr>
					</Table.Thead>

					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea>

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
> = async () => {
	const productDiscounts = await prisma.productDiscount.findMany();

	const shopSessions = await prisma.shopSession.findMany({
		select: { id: true, name: true },
	});
	const productCategories = await prisma.productCategory.findMany({
		select: { id: true, name: true },
	});

	return {
		props: {
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
