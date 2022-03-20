import { ScrollArea, Table } from '@mantine/core';
import PageTitle from 'components/head/PageTitle';
import GroupRow from 'components/tableRows/GroupRow';
import { USERS_LINKS } from 'navigation/dashboard/users';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { useMemo } from 'react';
import { ExtendedGroup } from 'types/groups';

interface DashboardUsersProps {
	groups: ExtendedGroup[];
	noGroupUsers: number;
}

function DashboardUsers({
	groups: serverSideGroups,
	noGroupUsers,
}: DashboardUsersProps) {
	const groups: ExtendedGroup[] = useMemo(
		() => [
			...serverSideGroups,
			{
				id: 'none',
				name: 'Utenti senza gruppo',
				_count: { users: noGroupUsers, managers: 0 },
			},
		],
		[serverSideGroups, noGroupUsers]
	);

	const rows = useMemo(
		() => groups.map((group, index) => <GroupRow key={index} group={group} />),
		[groups]
	);

	return (
		<>
			<PageTitle>Dashboard | Elenco gruppi</PageTitle>

			<h1>Elenco gruppi</h1>

			<ScrollArea>
				<Table sx={{ minWidth: '800px' }}>
					<thead>
						<tr>
							<th>Gruppo</th>
							<th>Utenti</th>
							<th>Gestori</th>
							<th>Azioni</th>
						</tr>
					</thead>

					<tbody>{rows}</tbody>
				</Table>
			</ScrollArea>
		</>
	);
}

DashboardUsers.hasSidebar = true;
DashboardUsers.sidebarLinks = USERS_LINKS;

export default DashboardUsers;

export const getServerSideProps: GetServerSideProps<
	DashboardUsersProps
> = async (ctx) => {
	const session = await getSession(ctx);

	const groups = await prisma.group.findMany({
		include: { _count: { select: { users: true, managers: true } } },
		orderBy: { name: 'asc' },
	});

	const noGroupUsers = await prisma.user.count({
		where: { groups: { none: {} } },
	});

	return {
		props: {
			session,
			groups,
			noGroupUsers,
		},
	};
};
