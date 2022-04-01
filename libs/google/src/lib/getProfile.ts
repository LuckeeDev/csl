import decode from 'jwt-decode';

interface Profile {
	iss: string;
	azp: string;
	aud: string;
	sub: string;
	hd: string;
	email: string;
	email_verified: boolean;
	at_hash: string;
	name: string;
	picture: string;
	given_name: string;
	family_name: string;
	locale: string;
	iat: number;
	exp: number;
}

export function getProfile(idToken: string): Profile {
	return decode(idToken);
}
