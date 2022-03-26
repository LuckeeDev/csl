import { User } from '@prisma/client';
import axios from 'axios';

export async function searchUser(url: string) {
	return (await axios.get<User[]>(url)).data;
}
