import { Role, User } from '@prisma/client';
import axios from 'axios';

export async function searchUser(url: string) {
	return (await axios.get<User[]>(url)).data;
}

export function updateUser(userId: User['id'], roles: Role['id'][]) {
	return async (currentData: (User & { roles: Role[] })[] | undefined) => {
		const { data: newUser } = await axios.patch<User & { roles: Role[] }>(
			`/api/users/${userId}`,
			{
				roles,
			}
		);

		const newData = [...(currentData ?? [])];

		const index = newData.findIndex((u) => u.id === userId);

		if (index !== -1) {
			newData[index] = newUser;
		} else {
			newData.push(newUser);
		}

		return newData;
	};
}
