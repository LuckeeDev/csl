import { Button, Table, Text } from '@mantine/core';
import { Order, Product } from '@prisma/client';
import PageTitle from 'components/head/PageTitle';
import { DASHBOARD_LINKS } from 'navigation/dashboard';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { useMemo } from 'react';
import { OmitDates } from 'types/omit';
import { BasePageProps } from 'types/pages';

interface DashboardManageOrdersProps extends BasePageProps {
	orders: OmitDates<Order & { product: OmitDates<Product> }>[];
}

interface OrderRowProps {
	order: OmitDates<Order & { product: OmitDates<Product> }>;
	onDelete: () => void;
}

function OrderRow({ order, onDelete }: OrderRowProps) {
	return (
		<tr>
			<td>{order.product.name}</td>
			<td>{order.quantity}</td>
			<td>{order.size}</td>
			<td>{order.color}</td>
			<td>{(order.product.price * order.quantity) / 100}€</td>
			<td>
				<Button color="red" onClick={onDelete}>
					Rimuovi
				</Button>
			</td>
		</tr>
	);
}

function DashboardManageOrders({ orders }: DashboardManageOrdersProps) {
	const rows = useMemo(
		() =>
			orders.map((order, index) => (
				<OrderRow
					onDelete={() => console.log('delete' + order.id)}
					order={order}
					key={index}
				/>
			)),
		[orders]
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
		<>
			<PageTitle>Dashboard | Gestione ordini</PageTitle>

			<h1>Gestione ordini</h1>

			<Table>
				<thead>
					<tr>
						<th>Prodotto</th>
						<th>Quantità</th>
						<th>Taglia</th>
						<th>Colore</th>
						<th>Costo</th>
						<th>Azioni</th>
					</tr>
				</thead>

				<tbody>{rows}</tbody>
			</Table>

			<Text>Totale: {total}€</Text>
		</>
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
		},
	};
};
