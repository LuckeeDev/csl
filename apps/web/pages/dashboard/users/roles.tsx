import {
	ActionIcon,
	Button,
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
import { IconTrash } from '@tabler/icons';

export default function DashboardUsersRoles() {
	const { data, mutate, error } = useSWR<{ roles: Role[] }>(
		'/api/roles',
		getEndpoint
	);
	useDataError(error);

	const form = useRoleForm();

	function handleSubmit(data: RoleFormValues) {
		console.log(data);
	}

	return (
		<DashboardPageContainer>
			<PageHeading loading={!data}>Ruoli</PageHeading>

			<Title order={2} my={0}>
				Ruoli esistenti
			</Title>

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
								<ActionIcon color="red" variant="filled">
									<IconTrash />
								</ActionIcon>
							</td>
						</tr>
					)) ?? []}
				</tbody>
			</Table>

			<Title order={2} mt="md" mb={0}>
				Crea un nuovo ruolo
			</Title>

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
		</DashboardPageContainer>
	);
}

DashboardUsersRoles.hasLocalCache = true;
DashboardUsersRoles.hasSidebar = true;
DashboardUsersRoles.sidebarLinks = USERS_LINKS;
