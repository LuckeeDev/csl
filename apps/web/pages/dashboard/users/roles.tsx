import { ActionIcon, Button, Collapse, Table } from '@mantine/core';
import getEndpoint from 'data/api/getEndpoint';
import useDataError from 'hooks/errors/useDataError';
import { USERS_LINKS } from 'navigation/dashboard/users';
import useSWR from 'swr';
import { Role } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageHeading from 'components/heading/PageHeading';
import useRoleForm, { RoleFormValues } from 'hooks/forms/useRoleForm';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import { createRole, deleteRole } from 'data/api/roles';
import { showNotification } from '@mantine/notifications';
import PageTitle from 'components/head/PageTitle';
import { useToggle } from '@mantine/hooks';
import RoleForm from 'components/forms/RoleForm';

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

			<Table sx={{ minWidth: '800px' }}>
				<thead>
					<tr>
						<th>Ruolo</th>
						<th>Permessi</th>
						<th>Azioni</th>
					</tr>
				</thead>

				<tbody>
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
				</tbody>
			</Table>

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
