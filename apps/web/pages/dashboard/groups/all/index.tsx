import { Pagination, ScrollArea, Table, createStyles } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import GroupForm from 'components/forms/GroupForm';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import GroupRow from 'components/tableRows/GroupRow';
import { createGroup, getGroups } from 'data/api/groups';
import useDataError from 'hooks/errors/useDataError';
import useGroupForm, { GroupFormValues } from 'hooks/forms/useGroupForm';
import useQueryState from 'hooks/router/useQueryState';
import { GROUPS_LINKS } from 'navigation/dashboard/groups';
import { useMemo } from 'react';
import useSWR from 'swr';

const useStyles = createStyles((theme) => ({
	textInput: {
		[`@media (max-width: ${theme.breakpoints.md})`]: {
			maxWidth: '300px',
		},
	},
}));

function DashboardGroupsAll() {
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
					value={pageIndex}
					onChange={setPageIndex}
					total={paginationTotal}
				/>
			</div>
		</DashboardPageContainer>
	);
}

DashboardGroupsAll.hasSidebar = true;
DashboardGroupsAll.sidebarLinks = GROUPS_LINKS;
DashboardGroupsAll.hasLocalCache = true;

export default DashboardGroupsAll;
