import {
	ActionIcon,
	Button,
	Collapse,
	MultiSelect,
	Table,
	TextInput,
	Title,
} from '@mantine/core';
import getEndpoint from 'data/api/getEndpoint';
import useDataError from 'hooks/errors/useDataError';
import { USERS_LINKS } from 'navigation/dashboard/users';
import useSWR from 'swr';
import { Role } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageHeading from 'components/heading/PageHeading';
import { PERMISSION_ARRAY } from 'utils/auth/PERMISSION_ARRAY';
import useRoleForm, { RoleFormValues } from 'hooks/forms/useRoleForm';
import { IconCheck, IconTrash } from '@tabler/icons';
import { createRole } from 'data/api/roles';
import { showNotification } from '@mantine/notifications';
import PageTitle from 'components/head/PageTitle';
import { useToggle } from '@mantine/hooks';

export default function DashboardUsersRoles() {
	const [isFormOpen, toggleIsFormOpen] = useToggle();

	const { data, mutate, error } = useSWR<{ roles: Role[] }>(
		'/api/roles',
		getEndpoint
	);
	useDataError(error);

	const form = useRoleForm();

	function handleSubmit(val: RoleFormValues) {
		mutate(createRole(val, data?.roles ?? []), {
			optimisticData: {
				roles: [
					...(data?.roles ?? []),
					{ id: '', ...val, created_at: new Date(), updated_at: new Date() },
				],
			},
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
					{data?.roles?.map((role, i) => (
						<tr key={i}>
							<td>{role.name}</td>
							<td>{role.permissions.join(', ')}</td>
							<td>
								<ActionIcon color="red">
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
				<form
					onSubmit={form.onSubmit(handleSubmit)}
					style={{ maxWidth: '500px' }}
				>
					<TextInput label="Nome" required {...form.getInputProps('name')} />

					<MultiSelect
						label="Permessi"
						required
						data={PERMISSION_ARRAY}
						searchable
						{...form.getInputProps('permissions')}
					/>

					<Button mt="sm" type="submit">
						Crea ruolo
					</Button>
				</form>
			</Collapse>
		</DashboardPageContainer>
	);
}

DashboardUsersRoles.hasLocalCache = true;
DashboardUsersRoles.hasSidebar = true;
DashboardUsersRoles.sidebarLinks = USERS_LINKS;
