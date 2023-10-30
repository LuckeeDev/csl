import { ScrollArea, Table } from '@mantine/core';
import { ShopSession } from '@prisma/client';
import PageTitle from 'components/head/PageTitle';
import ButtonLink from 'components/links/ButtonLink';
import ShopSessionRow from 'components/shopSessions/ShopSessionRow';
import { DASHBOARD_LINKS } from 'navigation/dashboard';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import getSessionStatus from 'utils/shop/getSessionStatus';

interface DashboardOrdersIndexProps {
	shopSessions: (Omit<
		ShopSession,
		'start' | 'end' | 'created_at' | 'updated_at'
	> & { start: string; end: string })[];
}

function DashboardOrdersIndex({ shopSessions }: DashboardOrdersIndexProps) {
	const rows = shopSessions
		.map((s) => ({ ...s, start: new Date(s.start), end: new Date(s.end) }))
		.map((element) => {
			const shopSession = { ...element, status: getSessionStatus(element) };

			return (
				<ShopSessionRow key={element.id} shopSession={shopSession}>
					<ButtonLink href={`/dashboard/orders/${shopSession.id}`}>
						Gestisci
					</ButtonLink>
				</ShopSessionRow>
			);
		});

	return (
		<>
			<PageTitle> Dashboard | Ordini</PageTitle>

			<h1>Ordini</h1>

			<ScrollArea>
				<Table style={{ minWidth: '800px' }}>
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
		</>
	);
}

DashboardOrdersIndex.sidebarLinks = DASHBOARD_LINKS;
DashboardOrdersIndex.hasSidebar = true;

export default DashboardOrdersIndex;

export const getServerSideProps: GetServerSideProps<
	DashboardOrdersIndexProps
> = async (ctx) => {
	const session = await getSession(ctx);
	const now = new Date();

	const shopSessions = await prisma.shopSession.findMany({
		where: { start: { lte: now } },
		select: {
			id: true,
			name: true,
			start: true,
			end: true,
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
