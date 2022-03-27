import { ActionIcon, InputWrapper, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { CheckIcon, Cross1Icon, PlusIcon } from '@modulz/radix-icons';
import { Group, User } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageHeading from 'components/heading/PageHeading';
import { getGroup, unlinkUsers, updateGroup } from 'data/api/groups';
import { searchUser } from 'data/api/users';
import useDataError from 'hooks/errors/useDataError';
import { USERS_LINKS } from 'navigation/dashboard/users';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { UnlinkUser } from 'types/groups';

function DashboardGroup() {
	const router = useRouter();
	const groupId = useMemo(() => router.query.groupId as string, [router.query]);
	const [search, setSearch] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(search, 500);
	const { data: searchResult } = useSWR(
		debouncedSearchQuery ? `/api/users?q=${debouncedSearchQuery}` : false,
		searchUser
	);
	const { data, mutate, error } = useSWR(
		groupId ? `/api/groups/${groupId}` : false,
		getGroup
	);
	const notifications = useDataError(error);

	function unlink(type: UnlinkUser, userIds: string[]) {
		function getOptimisticData(
			group: Group & { managers: User[]; _count: { users: number } }
		) {
			if (type === UnlinkUser.MANAGERS) {
				const indexes = userIds.map((id) =>
					group.managers.findIndex((user) => user.id === id)
				);

				for (const index of indexes) {
					group.managers.splice(index, 1);
				}
			}

			if (type === UnlinkUser.USERS) {
				group._count.users = group._count.users - userIds.length;
			}

			return { group };
		}

		if (data?.group) {
			mutate(unlinkUsers(type, userIds, groupId), {
				optimisticData: getOptimisticData(data.group),
				revalidate: false,
			});

			notifications.showNotification({
				color: 'orange',
				title: 'Gestore rimosso',
				message: "L'operazione è stata completata con successo",
				icon: <Cross1Icon />,
			});
		}
	}

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
				{data?.group?.name ?? 'Dettagli gruppo'}
			</PageHeading>

			{data?.group && (
				<>
					<h2 style={{ margin: 0 }}>Gestori</h2>

					{data.group.managers?.length > 0 && (
						<ul>
							{data.group.managers.map((user, index) => (
								<li
									style={{ display: 'list-item', alignItems: 'center' }}
									key={index}
								>
									{user.email ?? user.name ?? user.id}

									<ActionIcon
										color="red"
										onClick={() => unlink(UnlinkUser.MANAGERS, [user.id])}
										style={{ display: 'inline-block' }}
									>
										<Cross1Icon />
									</ActionIcon>
								</li>
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

					<h2>Utenti: {data.group._count.users}</h2>
				</>
			)}
		</DashboardPageContainer>
	);
}

DashboardGroup.hasSidebar = true;
DashboardGroup.sidebarLinks = USERS_LINKS;
DashboardGroup.hasLocalCache = true;

export default DashboardGroup;
