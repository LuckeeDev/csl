import { ScrollArea, Table } from '@mantine/core';
import { ShopSession } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import ShopSessionRow from 'components/shopSessions/ShopSessionRow';
import { SHOP_LINKS } from 'navigation/dashboard/shop';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';

interface DashboardShopIndexProps {
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

			<ScrollArea>
				<Table style={{ minWidth: 800 }}>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Nome</Table.Th>
							<Table.Th>Data di inizio</Table.Th>
							<Table.Th>Data di fine</Table.Th>
							<Table.Th>Azioni</Table.Th>
						</Table.Tr>
					</Table.Thead>

					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea>
		</DashboardPageContainer>
	);
}

DashboardShopIndex.hasSidebar = true;
DashboardShopIndex.sidebarLinks = SHOP_LINKS;

export default DashboardShopIndex;

export const getServerSideProps: GetServerSideProps<
	DashboardShopIndexProps
> = async () => {
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
			shopSessions: shopSessions.map((s) => ({
				...s,
				start: s.start.toISOString(),
				end: s.end.toISOString(),
			})),
		},
	};
};
