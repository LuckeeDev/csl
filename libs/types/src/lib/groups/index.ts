import { StrapiUser } from '@csl/types';

export interface StrapiGroup {
	id: string;
	name: string;
	users: Omit<StrapiUser, 'group'>[];
}
