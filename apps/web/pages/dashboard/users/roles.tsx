import { ActionIcon, Button, Collapse, ScrollArea, Table } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { Role } from '@prisma/client';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import RoleForm from 'components/forms/RoleForm';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import getEndpoint from 'data/api/getEndpoint';
import { createRole, deleteRole } from 'data/api/roles';
import useDataError from 'hooks/errors/useDataError';
import useRoleForm, { RoleFormValues } from 'hooks/forms/useRoleForm';
import { USERS_LINKS } from 'navigation/dashboard/users';
import useSWR from 'swr';

export default function DashboardUsersRoles() {
	const [isFormOpen, toggleIsFormOpen] = useToggle();

	const { data, mutate, error } = useSWR<Role[]>('/api/roles', getEndpoint);
	useDataError(error);

	const form = useRoleForm();

	function handleSubmit(val: RoleFormValues) {
		mutate(createRole(val), {
			optimisticData: [
				...(data ?? []),
				{ id: 'new', ...val, created_at: new Date(), updated_at: new Date() },
			],
			revalidate: false,
		});

		form.reset();

		showNotification({
			title: 'Ruolo creato',
			message: `Il ruolo "${val.name}" è stato creato`,
			color: 'teal',
			icon: <IconCheck />,
		});
	}

	function handleDelete(role: Role) {
		const newData = [...(data ?? [])];

		const index = newData?.findIndex((r) => r.id === role.id);

		if (index !== -1) {
			newData?.splice(index, 1);
		}

		mutate(deleteRole(role.id), {
			optimisticData: newData,
			revalidate: false,
		});

		showNotification({
			title: 'Ruolo eliminato',
			message: `Il ruolo "${role.name}" è stato eliminato`,
			color: 'teal',
			icon: <IconCheck />,
		});
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Ruoli</PageTitle>

			<PageHeading loading={!data}>Ruoli</PageHeading>

			<ScrollArea>
				<Table style={{ minWidth: '800px' }}>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Ruolo</Table.Th>
							<Table.Th>Permessi</Table.Th>
							<Table.Th>Azioni</Table.Th>
						</Table.Tr>
					</Table.Thead>

					<Table.Tbody>
						{data?.map((role, i) => (
							<tr key={i}>
								<td>{role.name}</td>
								<td>{role.permissions.join(', ')}</td>
								<td>
									<ActionIcon color="red" onClick={() => handleDelete(role)}>
										<IconTrash />
									</ActionIcon>
								</td>
							</tr>
						)) ?? []}
					</Table.Tbody>
				</Table>
			</ScrollArea>

			<Button onClick={() => toggleIsFormOpen()}>
				{isFormOpen ? 'Chiudi' : 'Crea ruolo'}
			</Button>

			<Collapse in={isFormOpen} transitionDuration={0}>
				<RoleForm onSubmit={handleSubmit} form={form} />
			</Collapse>
		</DashboardPageContainer>
	);
}

DashboardUsersRoles.hasLocalCache = true;
DashboardUsersRoles.hasSidebar = true;
DashboardUsersRoles.sidebarLinks = USERS_LINKS;
