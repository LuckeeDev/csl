import { environment } from '@/environments/environment';
import { StrapiUser } from '@csl/types';
import axios from 'axios';

export default async function updateMe(user: Partial<StrapiUser>) {
	return await axios.put<StrapiUser>(`${environment.strapi}/users/me`, user, {
		withCredentials: true,
	});
}
