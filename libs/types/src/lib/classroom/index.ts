import { StrapiUser } from '@csl/types';

export interface StrapiClassroom {
	name: string;
	users: Omit<StrapiUser, 'classroom'>[];
}
