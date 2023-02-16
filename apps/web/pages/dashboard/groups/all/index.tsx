import { createStyles, Pagination, ScrollArea, Table } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import GroupRow from 'components/tableRows/GroupRow';
import useQueryState from 'hooks/router/useQueryState';
import useGroupForm, { GroupFormValues } from 'hooks/forms/useGroupForm';
import { GROUPS_LINKS } from 'navigation/dashboard/groups';
import { useMemo } from 'react';
import useSWR from 'swr';
import { createGroup, getGroups } from 'data/api/groups';
import GroupForm from 'components/forms/GroupForm';
import PageHeading from 'components/heading/PageHeading';
import useDataError from 'hooks/errors/useDataError';
import { showNotification } from '@mantine/notifications';

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
	useDataError(error);

	const paginationTotal = useMemo(
		() => Math.ceil((data?.groupsCount ?? 20) / 20),
		[data?.groupsCount]
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

		showNotification({
			title: 'Gruppo creato',
			message: `Il gruppo "${val.name}" è stato creato`,
			color: 'teal',
			icon: <IconCheck />,
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
						{data?.groups?.map((group, index) => (
							<GroupRow key={index} group={group} />
						)) ?? []}
						<tr>
							<td>
								<GroupForm
									className={classes.textInput}
									form={form}
									onSubmit={onSubmit}
								/>
							</td>

							{/* Added these table data to show a full line above the group form */}
							<td></td>
							<td></td>
							<td></td>
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
DashboardUsers.sidebarLinks = GROUPS_LINKS;
DashboardUsers.hasLocalCache = true;

export default DashboardUsers;
