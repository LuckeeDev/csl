import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import PageTitle from 'components/head/PageTitle';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { Table } from '@mantine/core';
import ShopSessionRow from 'components/shopSessions/ShopSessionRow';
import { ShopSession } from '@prisma/client';
import { BasePageProps } from 'types/pages';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';

interface DashboardShopIndexProps extends BasePageProps {
	shopSessions: (Omit<
		ShopSession,
		'start' | 'end' | 'created_at' | 'updated_at'
	> & { start: string; end: string })[];
}

function DashboardShopIndex({ shopSessions }: DashboardShopIndexProps) {
	const rows = shopSessions
		.map((s) => ({ ...s, start: new Date(s.start), end: new Date(s.end) }))
		.map((element) => (
			<ShopSessionRow key={element.id} shopSession={element} />
		));

	return (
		<DashboardPageContainer>
			<PageTitle>Sessioni di vendita | Dashboard</PageTitle>

			<h1>Sessioni di vendita</h1>

			<Table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Data di inizio</th>
						<th>Data di fine</th>
						<th>Azioni</th>
					</tr>
				</thead>

				<tbody>{rows}</tbody>
			</Table>
		</DashboardPageContainer>
	);
}

DashboardShopIndex.hasSidebar = true;
DashboardShopIndex.sidebarLinks = SHOP_LINKS;

export default DashboardShopIndex;

export const getServerSideProps: GetServerSideProps<
	DashboardShopIndexProps
> = async (ctx) => {
	const session = await getSession(ctx);

	const shopSessions = await prisma.shopSession.findMany({
		select: {
			id: true,
			name: true,
			start: true,
			end: true,
		},
		orderBy: {
			created_at: 'desc',
		},
	});

	return {
		props: {
			session,
			shopSessions: shopSessions.map((s) => ({
				...s,
				start: s.start.toISOString(),
				end: s.end.toISOString(),
			})),
		},
	};
};
