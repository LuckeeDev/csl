import { Role } from '@prisma/client';
import axios from 'axios';
import { RoleFormValues } from 'hooks/forms/useRoleForm';

export function createRole(role: RoleFormValues) {
	return async (currentData: Role[] | undefined) => {
		const { data: newRole } = await axios.post<Role>('/api/roles', role);

		const roles = currentData ?? [];

		const index = roles.findIndex((r) => r.id === 'new');

		if (index !== -1) {
			roles[index] = newRole;
		} else {
			roles.push(newRole);
		}

		return roles;
	};
}

export function deleteRole(id: Role['id']) {
	return async (currentData: Role[] | undefined) => {
		await axios.delete(`/api/roles/${id}`);

		const index = currentData?.findIndex((r) => r.id === id);

		if (index && index !== -1) {
			currentData?.splice(index, 1);
		}

		return currentData;
	};
}
