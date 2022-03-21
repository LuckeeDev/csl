import axios from 'axios';
import { environment } from 'environments/environment';
import { GroupFormValues } from 'hooks/forms/useGroupForm';
import { ExtendedGroup } from 'types/groups';

export async function getGroups(url: string) {
	return (
		await axios.get<{ groups: ExtendedGroup[]; groupsCount: number }>(url)
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
