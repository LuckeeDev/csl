import { StrapiUser } from '@csl/types';

export interface AuthStateModel {
	jwt: string;
	user: StrapiUser;
	loading: boolean;
}
