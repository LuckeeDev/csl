import { Role } from '@prisma/client';
import axios from 'axios';
import { environment } from 'environments/environment';
import { RoleFormValues } from 'hooks/forms/useRoleForm';

export function createRole(role: RoleFormValues, currentRoles: Role[]) {
	return async () => {
		const { data: newRole } = await axios.post<Role>(
			`${environment.url}/api/roles`,
			role
		);

		const roles = [...currentRoles, newRole];

		return { roles };
	};
}
