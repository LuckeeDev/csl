export interface StrapiRole {
	id: number;
	name: string;
	description: string;
	type: string;
}

export interface StrapiUser {
	id: number;
	username: string;
	email: string;
	provider: 'google';
	confirmed: boolean;
	blocked: boolean;
	role: StrapiRole;
	created_at: string;
	updated_at: string;
}

export interface StrapiAuthResponse {
	jwt: string;
	user: StrapiUser;
}
