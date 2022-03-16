import { LoadingOverlay, Table, Text } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import { Order, Product, ProductDiscount } from '@prisma/client';
import axios from 'axios';
import PageTitle from 'components/head/PageTitle';
import OrderRow from 'components/tableRows/OrderRow';
import { DASHBOARD_LINKS } from 'navigation/dashboard';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { useCallback, useMemo, useState } from 'react';
import { OmitDates } from 'types/omit';
import { BasePageProps } from 'types/pages';
import { SessionStatus } from 'types/shopSession';
import calculateDiscount from 'utils/shop/calculateDiscount';
import getSessionStatus from 'utils/shop/getSessionStatus';

interface DashboardManageOrdersProps extends BasePageProps {
	orders: OmitDates<Order & { product: OmitDates<Product> }>[];
	sessionStatus: SessionStatus;
	discounts: OmitDates<ProductDiscount>[];
}

function DashboardManageOrders({
	orders: serverSideOrders,
	sessionStatus,
	discounts,
}: DashboardManageOrdersProps) {
	const [orders, setOrders] = useState(serverSideOrders);
	const [overlay, toggleOverlay] = useBooleanToggle(false);
	const notifications = useNotifications();
	const discountedOrders = useMemo(
		() => calculateDiscount(discounts, orders),
		[discounts, orders]
	);

	const onDelete = useCallback(
		async (orderId: string) => {
			toggleOverlay(true);

			try {
				await axios.delete(`/api/orders/${orderId}`);

				setOrders((elements) => {
					const index = elements.findIndex((e) => e.id === orderId);
					elements.splice(index, 1);

					return elements;
				});

				notifications.showNotification({
					title: 'Ordine eliminato',
					message: "L'ordine è stato eliminato con successo",
					color: 'teal',
					icon: <CheckIcon />,
				});

				toggleOverlay(false);
			} catch (err) {
				notifications.showNotification({
					title: 'Errore',
					message: 'È stato impossibile eliminare questo ordine',
					color: 'red',
					icon: <Cross1Icon />,
				});

				toggleOverlay(false);
			}
		},
		[toggleOverlay, notifications]
	);

	const rows = useMemo(
		() =>
			discountedOrders.map((order, index) => (
				<OrderRow
					onDelete={() => onDelete(order.id)}
					order={order}
					key={index}
					hasActions={sessionStatus === SessionStatus.ONGOING}
				/>
			)),
		[discountedOrders, onDelete, sessionStatus]
	);

	const total = useMemo(
		() =>
			orders.reduce((previous, current) => {
				const currentTotal = (current.product.price * current.quantity) / 100;

				return previous + currentTotal;
			}, 0),
		[orders]
	);

	return (
		<div style={{ position: 'relative' }}>
			<PageTitle>Dashboard | Gestione ordini</PageTitle>

			<LoadingOverlay visible={overlay} />

			<h1>Gestione ordini</h1>

			<Table>
				<thead>
					<tr>
						<th>Prodotto</th>
						<th>Quantità</th>
						<th>Taglia</th>
						<th>Colore</th>
						<th>Costo</th>
						{sessionStatus === SessionStatus.ONGOING && <th>Azioni</th>}
					</tr>
				</thead>

				<tbody>{rows}</tbody>
			</Table>

			<Text>Totale: {total}€</Text>
		</div>
	);
}

DashboardManageOrders.sidebarLinks = DASHBOARD_LINKS;
DashboardManageOrders.hasSidebar = true;

export default DashboardManageOrders;

export const getServerSideProps: GetServerSideProps<
	DashboardManageOrdersProps
> = async (ctx) => {
	const shopSessionId = ctx.params?.id as string;
	const session = await getSession(ctx);

	const shopSession = await prisma.shopSession.findUnique({
		where: { id: shopSessionId },
		select: {
			discounts: true,
			id: true,
			name: true,
			end: true,
			start: true,
		},
	});

	if (!shopSession) {
		return {
			notFound: true,
		};
	}

	const sessionStatus = getSessionStatus(shopSession);

	const discounts = await prisma.productDiscount.findMany({
		where: {
			shopSession: {
				id: shopSessionId,
			},
		},
	});

	const savedOrders = await prisma.order.findMany({
		where: {
			product: {
				shopSession: {
					id: shopSessionId,
				},
			},
		},
		include: {
			product: true,
		},
	});

	const orders = savedOrders.map(
		({
			updated_at,
			created_at,
			product: {
				updated_at: product_updated_at,
				created_at: product_created_at,
				...product
			},
			...order
		}) => ({ ...order, product })
	);

	return {
		props: {
			session,
			orders,
			sessionStatus,
			discounts: discounts.map(
				({ updated_at, created_at, ...discount }) => discount
			),
		},
	};
};
