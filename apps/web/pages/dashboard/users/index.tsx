import {
	ActionIcon,
	InputWrapper,
	Pagination,
	ScrollArea,
	Table,
	TextInput,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import axios from 'axios';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import LoaderDiv from 'components/loader/LoaderDiv';
import GroupRow from 'components/tableRows/GroupRow';
import { environment } from 'environments/environment';
import useQueryState from 'hooks/router/useQueryState';
import useGroupForm, { GroupFormValues } from 'hooks/forms/useGroupForm';
import { USERS_LINKS } from 'navigation/dashboard/users';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { ExtendedGroup } from 'types/groups';

async function getGroups(url: string) {
	return (
		await axios.get<{ groups: ExtendedGroup[]; groupsCount: number }>(url)
	).data;
}

function createGroup(group: GroupFormValues, currentGroups: ExtendedGroup[]) {
	return async () => {
		const { data: newGroup } = await axios.post<ExtendedGroup>(
			`${environment.url}/api/groups`,
			group
		);

		const groups = [...currentGroups, newGroup];

		return { groups, groupsCount: currentGroups.length + 1 };
	};
}

function DashboardUsers() {
	const [pageIndex, setPageIndex] = useQueryState<number>('page', 1);
	const form = useGroupForm();
	const notifications = useNotifications();
	const { data, mutate, error } = useSWR(
		`/api/groups?page=${pageIndex}`,
		getGroups
	);

	const paginationTotal = useMemo(
		() => Math.ceil((data?.groupsCount ?? 20) / 20),
		[data?.groupsCount]
	);

	const rows = useMemo(
		() =>
			data?.groups?.map((group, index) => (
				<GroupRow key={index} group={group} />
			)) ?? [],
		[data?.groups]
	);

	useEffect(() => {
		if (error) {
			notifications.showNotification({
				title: 'Errore',
				message: "C'è stato un errore nel caricamento dei dati",
				color: 'red',
				icon: <Cross1Icon />,
			});
		}
	}, [error, notifications]);

	function onSubmit(val: GroupFormValues) {
		mutate(createGroup(val, data?.groups ?? []), {
			optimisticData: {
				groups: [
					...(data?.groups ?? []),
					{ id: '', name: val.name, _count: { managers: 0, users: 0 } },
				],
				groupsCount: (data?.groups?.length ?? 0) + 1,
			},
			revalidate: false,
		});

		form.reset();

		notifications.showNotification({
			title: 'Gruppo creato',
			message: `Il gruppo "${val.name}" è stato creato`,
			color: 'teal',
			icon: <CheckIcon />,
		});
	}

	return (
		<DashboardPageContainer>
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
												<ActionIcon type="submit" color="blue" variant="filled">
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

				{!data?.groups && <LoaderDiv />}
			</ScrollArea>

			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<Pagination
					page={pageIndex}
					onChange={setPageIndex}
					total={paginationTotal}
				/>
			</div>
		</DashboardPageContainer>
	);
}

DashboardUsers.hasSidebar = true;
DashboardUsers.sidebarLinks = USERS_LINKS;

export default DashboardUsers;
