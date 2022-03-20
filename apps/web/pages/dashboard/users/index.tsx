import {
	ActionIcon,
	InputWrapper,
	LoadingOverlay,
	ScrollArea,
	Table,
	TextInput,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import axios from 'axios';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import GroupRow from 'components/tableRows/GroupRow';
import { environment } from 'environments/environment';
import useGroupForm, { GroupFormValues } from 'hooks/useGroupForm';
import { USERS_LINKS } from 'navigation/dashboard/users';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { useMemo, useState } from 'react';
import { ExtendedGroup } from 'types/groups';

interface DashboardUsersProps {
	groups: ExtendedGroup[];
	noGroupUsers: number;
}

function DashboardUsers({
	groups: serverSideGroups,
	noGroupUsers,
}: DashboardUsersProps) {
	const [groups, setGroups] = useState(serverSideGroups);
	const form = useGroupForm();
	const notifications = useNotifications();
	const [overlay, toggleOverlay] = useBooleanToggle(false);

	const allGroups: ExtendedGroup[] = useMemo(
		() => [
			...groups,
			{
				id: 'none',
				name: 'Utenti senza gruppo',
				_count: { users: noGroupUsers, managers: 0 },
			},
		],
		[groups, noGroupUsers]
	);

	const rows = useMemo(
		() =>
			allGroups.map((group, index) => <GroupRow key={index} group={group} />),
		[allGroups]
	);

	async function onSubmit(val: GroupFormValues) {
		try {
			toggleOverlay(true);

			const { data } = await axios.post<ExtendedGroup>(
				`${environment.url}/api/groups`,
				val
			);

			setGroups((current) => [...current, data]);

			form.reset();

			notifications.showNotification({
				title: 'Gruppo creato',
				message: `Il gruppo ${data.name} è stato creato`,
				color: 'teal',
				icon: <CheckIcon />,
			});

			toggleOverlay(false);
		} catch (err) {
			notifications.showNotification({
				title: 'Errore',
				message: 'Non è stato possibile creare il gruppo',
				color: 'red',
				icon: <Cross1Icon />,
			});

			toggleOverlay(false);
		}
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Elenco gruppi</PageTitle>

			<LoadingOverlay visible={overlay} />

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

					<tbody>
						{rows}
						<tr>
							<td>
								<form onSubmit={form.onSubmit(onSubmit)}>
									<InputWrapper label="Nuovo gruppo">
										<TextInput
											placeholder="Inserisci un nome per il nuovo gruppo"
											{...form.getInputProps('name')}
											rightSection={
												<ActionIcon type="submit" color="teal" variant="filled">
													<CheckIcon />
												</ActionIcon>
											}
										/>
									</InputWrapper>
								</form>
							</td>
						</tr>
					</tbody>
				</Table>
			</ScrollArea>
		</DashboardPageContainer>
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
