import { StrapiUser } from '../auth';

export interface StrapiGroup {
	id: string;
	name: string;
	users: Omit<StrapiUser, 'group'>[];
}
