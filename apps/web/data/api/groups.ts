import { Group, User } from '@prisma/client';
import axios from 'axios';
import { environment } from 'environments/environment';
import { GroupFormValues } from 'hooks/forms/useGroupForm';
import { ExtendedGroup } from 'types/groups';

export async function getGroups(url: string) {
	return (
		await axios.get<{ groups: ExtendedGroup[]; groupsCount: number }>(url)
	).data;
}

export async function getGroup(url: string) {
	return (
		await axios.get<{
			group: Group & {
				managers: User[];
				_count: {
					users: number;
				};
			};
		}>(url)
	).data;
}

export function createGroup(
	group: GroupFormValues,
	currentGroups: ExtendedGroup[]
) {
	return async () => {
		const { data: newGroup } = await axios.post<ExtendedGroup>(
			`${environment.url}/api/groups`,
			group
		);

		const groups = [...currentGroups, newGroup];

		return { groups, groupsCount: currentGroups.length + 1 };
	};
}

export function updateGroup(group: { managersIds: string[] }, groupId: string) {
	return async () => {
		const { data } = await axios.patch<{
			group: Group & {
				managers: User[];
				_count: {
					users: number;
				};
			};
		}>(`${environment.url}/api/groups/${groupId}`, group);

		return { group: data.group };
	};
}
