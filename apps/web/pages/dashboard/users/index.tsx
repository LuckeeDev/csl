import { createStyles, Pagination, ScrollArea, Table } from '@mantine/core';
import { CheckIcon } from '@modulz/radix-icons';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import GroupRow from 'components/tableRows/GroupRow';
import useQueryState from 'hooks/router/useQueryState';
import useGroupForm, { GroupFormValues } from 'hooks/forms/useGroupForm';
import { USERS_LINKS } from 'navigation/dashboard/users';
import { useMemo } from 'react';
import useSWR from 'swr';
import { createGroup, getGroups } from 'data/api/groups';
import GroupForm from 'components/forms/GroupForm';
import PageHeading from 'components/heading/PageHeading';
import useDataError from 'hooks/errors/useDataError';

const useStyles = createStyles((theme) => ({
	textInput: {
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			maxWidth: '300px',
		},
	},
}));

function DashboardUsers() {
	const { classes } = useStyles();
	const [pageIndex, setPageIndex] = useQueryState<number>('page', 1);
	const form = useGroupForm();
	const { data, mutate, error } = useSWR(
		`/api/groups?page=${pageIndex}`,
		getGroups
	);
	const notifications = useDataError(error);

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

			<PageHeading loading={!data?.groups}>Elenco gruppi</PageHeading>

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
								<GroupForm
									className={classes.textInput}
									form={form}
									onSubmit={onSubmit}
								/>
							</td>
						</tr>
					</tbody>
				</Table>
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
DashboardUsers.hasLocalCache = true;

export default DashboardUsers;
