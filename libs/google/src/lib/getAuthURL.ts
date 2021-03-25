const URL = 'https://accounts.google.com/o/oauth2/v2/auth';

export function getAuthURL(
	clientID: string,
	redirect: string,
	scopes: string[],
	next: string,
) {
	return `${URL}?client_id=${clientID}&redirect_uri=${redirect}&response_type=code&scope=${scopes.join(' ')}&access_type=offline&state=${next}`;
}
