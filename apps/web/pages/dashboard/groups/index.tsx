import { ScrollArea, Table } from '@mantine/core';
import { Group } from '@prisma/client';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import GroupRow from 'components/tableRows/GroupRow';
import getEndpoint from 'data/api/getEndpoint';
import { GROUPS_LINKS } from 'navigation/dashboard/groups';
import useSWR from 'swr';

export default function DashboardGroups() {
	const { data } = useSWR<{
		group: Group | null;
		managedGroups: (Group & {
			_count: {
				users: number;
				managers: number;
			};
		})[];
	}>('/api/groups/me', getEndpoint);

	return (
		<>
			<PageTitle>Dashboard | I miei gruppi</PageTitle>

			<PageHeading loading={!data}>I miei gruppi</PageHeading>

			{data?.group ? (
				<p style={{ margin: 0 }}>Fai parte del gruppo {data.group.name}.</p>
			) : (
				<p style={{ margin: 0 }}>
					Non fai ancora parte di alcun gruppo, chiedi al tuo gestore di
					inviarti il link d&apos;invito
				</p>
			)}

			{data && data.managedGroups.length > 0 && (
				<>
					<h3>I gruppi che gestisco</h3>

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

							<tbody>
								{data.managedGroups?.map((group, index) => (
									<GroupRow key={index} group={group} />
								)) ?? []}
							</tbody>
						</Table>
					</ScrollArea>
				</>
			)}
		</>
	);
}

DashboardGroups.hasLocalCache = true;
DashboardGroups.hasSidebar = true;
DashboardGroups.sidebarLinks = GROUPS_LINKS;
