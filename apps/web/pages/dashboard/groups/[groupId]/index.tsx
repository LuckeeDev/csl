import { ActionIcon, Button, Input, TextInput } from '@mantine/core';
import { useClipboard, useDebouncedValue } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX, IconPlus } from '@tabler/icons-react';
import { Group, User } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageHeading from 'components/heading/PageHeading';
import { getGroup, unlinkUsers, updateGroup } from 'data/api/groups';
import { searchUser } from 'data/api/users';
import { environment } from 'environments/environment';
import useDataError from 'hooks/errors/useDataError';
import { GROUPS_LINKS } from 'navigation/dashboard/groups';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
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
	useDataError(error);

	const clipboard = useClipboard();

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

			showNotification({
				color: 'orange',
				title: 'Gestore rimosso',
				message: "L'operazione è stata completata con successo",
				icon: <IconX />,
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

			showNotification({
				color: 'teal',
				title: 'Gestore aggiunto',
				message: "L'operazione è stata completata con successo",
				icon: <IconCheck />,
			});
		}
	}

	const copyLinkToClipboard = useCallback(() => {
		clipboard.copy(`${environment.url}/invite/${groupId}`);

		showNotification({
			title: 'Link copiato',
			message: 'Ora puoi mandare questo link agli altri membri del gruppo',
			color: 'teal',
			icon: <IconCheck />,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [groupId]);

	return (
		<DashboardPageContainer>
			<PageHeading back loading={!data}>
				{data?.group?.name ?? 'Dettagli gruppo'}
			</PageHeading>

			{data?.group && (
				<div>
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
										<IconX />
									</ActionIcon>
								</li>
							))}
						</ul>
					)}

					<Input.Wrapper label="Aggiungi gestori">
						<TextInput
							onChange={(e) => setSearch(e.currentTarget.value)}
							value={search}
							placeholder="Cerca un utente da aggiungere come gestore..."
						/>
					</Input.Wrapper>

					{searchResult?.map((user, index) => (
						<div style={{ display: 'flex', alignItems: 'center' }} key={index}>
							{user.email ?? user.name ?? user.id}
							<ActionIcon color="blue" onClick={() => addManager(user)}>
								<IconPlus />
							</ActionIcon>
						</div>
					))}

					<h2 style={{ marginBottom: 0 }}>Utenti: {data.group._count.users}</h2>

					{data?.group && (
						<Button size="xs" onClick={copyLinkToClipboard}>
							Copia link d&apos;invito
						</Button>
					)}
				</div>
			)}
		</DashboardPageContainer>
	);
}

DashboardGroup.hasSidebar = true;
DashboardGroup.sidebarLinks = GROUPS_LINKS;
DashboardGroup.hasLocalCache = true;

export default DashboardGroup;
