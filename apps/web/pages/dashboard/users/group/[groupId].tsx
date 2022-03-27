import { ActionIcon, InputWrapper, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { CheckIcon, PlusIcon } from '@modulz/radix-icons';
import { User } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageHeading from 'components/heading/PageHeading';
import { getGroup, updateGroup } from 'data/api/groups';
import { searchUser } from 'data/api/users';
import useDataError from 'hooks/errors/useDataError';
import { USERS_LINKS } from 'navigation/dashboard/users';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

function DashboardGroup() {
	const router = useRouter();
	const groupId = useMemo(() => router.query.groupId as string, [router.query]);
	const [search, setSearch] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(search, 500);
	const { data: searchResult } = useSWR(
		`/api/users?q=${debouncedSearchQuery}`,
		searchUser
	);
	const { data, mutate, error } = useSWR(`/api/groups/${groupId}`, getGroup);
	const notifications = useDataError(error);

	function addManager(user: User) {
		if (data?.group) {
			mutate(updateGroup({ managersIds: [user.id] }, groupId), {
				optimisticData: {
					group: {
						...data?.group,
						managers: [...(data?.group.managers ?? []), user],
					},
				},
				revalidate: false,
			});

			notifications.showNotification({
				color: 'teal',
				title: 'Gestore aggiunto',
				message: "L'operazione è stata completata con successo",
				icon: <CheckIcon />,
			});
		}
	}

	return (
		<DashboardPageContainer>
			<PageHeading back loading={!data}>
				{data?.group.name ?? 'Dettagli gruppo'}
			</PageHeading>

			{data?.group && (
				<>
					<h2 style={{ margin: 0 }}>Gestori</h2>

					{data.group.managers?.length > 0 && (
						<ul>
							{data.group.managers.map((user, index) => (
								<li key={index}>{user.email ?? user.name ?? user.id}</li>
							))}
						</ul>
					)}

					<InputWrapper label="Aggiungi gestori">
						<TextInput
							onChange={(e) => setSearch(e.currentTarget.value)}
							value={search}
							placeholder="Cerca un utente da aggiungere come gestore..."
						/>
					</InputWrapper>

					{searchResult?.map((user, index) => (
						<div style={{ display: 'flex', alignItems: 'center' }} key={index}>
							{user.email ?? user.name ?? user.id}
							<ActionIcon color="blue" onClick={() => addManager(user)}>
								<PlusIcon />
							</ActionIcon>
						</div>
					))}
				</>
			)}
		</DashboardPageContainer>
	);
}

DashboardGroup.hasSidebar = true;
DashboardGroup.sidebarLinks = USERS_LINKS;
DashboardGroup.hasLocalCache = true;

export default DashboardGroup;
