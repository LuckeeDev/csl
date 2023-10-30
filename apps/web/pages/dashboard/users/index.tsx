import { ScrollArea, Table, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { Role, User } from '@prisma/client';
import { IconCheck } from '@tabler/icons-react';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import UserRow from 'components/tableRows/UserRow';
import getEndpoint from 'data/api/getEndpoint';
import { updateUser } from 'data/api/users';
import useDataError from 'hooks/errors/useDataError';
import { USERS_LINKS } from 'navigation/dashboard/users';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

export default function DashboardUsers() {
	const [search, setSearch] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(search, 500);
	const {
		data: searchResult,
		mutate,
		error: searchError,
	} = useSWR<(User & { roles: Role[] })[]>(
		debouncedSearchQuery
			? `/api/users?q=${debouncedSearchQuery}&include=roles`
			: false,
		getEndpoint
	);
	useDataError(searchError);

	const { data: availableRoles, error: rolesError } = useSWR<Role[]>(
		'/api/roles',
		getEndpoint
	);
	useDataError(rolesError);

	const selectData = useMemo(
		() => availableRoles?.map((r) => ({ value: r.id, label: r.name })) ?? [],
		[availableRoles]
	);

	async function updateRoles(userId: User['id'], roles: string[]) {
		const optimisticData = [...(searchResult ?? [])];

		const optimisticRoles = [...(availableRoles ?? [])].filter((r) =>
			roles.includes(r.id)
		);

		const index = optimisticData.findIndex((u) => u.id === userId);

		optimisticData[index].roles = optimisticRoles;

		console.log(optimisticData);

		mutate(updateUser(userId, roles), { optimisticData, revalidate: false });

		showNotification({
			title: 'Ruoli aggiornati',
			message: "I ruoli sono stati collegati correttamente all'utente",
			icon: <IconCheck />,
			color: 'teal',
		});
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Utenti</PageTitle>

			<PageHeading>Utenti</PageHeading>

			<TextInput
				onChange={(e) => setSearch(e.currentTarget.value)}
				value={search}
				placeholder="utente@example.com"
				label="Ricerca utenti"
			/>

			<ScrollArea>
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Nome</Table.Th>
							<Table.Th>Email</Table.Th>
							<Table.Th>Ruoli</Table.Th>
							<Table.Th>Azioni</Table.Th>
						</Table.Tr>
					</Table.Thead>

					<Table.Tbody>
						{searchResult?.map((user, index) => (
							<UserRow
								key={index}
								user={user}
								selectData={selectData}
								updateRoles={updateRoles}
							/>
						))}
					</Table.Tbody>
				</Table>
			</ScrollArea>
		</DashboardPageContainer>
	);
}

DashboardUsers.hasLocalCache = true;
DashboardUsers.hasSidebar = true;
DashboardUsers.sidebarLinks = USERS_LINKS;
