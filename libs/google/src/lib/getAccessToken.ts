import { URLSearchParams } from 'url';
import axios from 'axios';

interface AccessTokenResponse {
	access_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

export async function getAccessToken(
	refreshToken: string,
	clientID: string,
	clientSecret: string
): Promise<string> {
	const data = {
		refresh_token: refreshToken,
		client_id: clientID,
		client_secret: clientSecret,
		grant_type: 'refresh_token',
	};

	const body = new URLSearchParams(data);

	const response = await axios
		.post('https://oauth2.googleapis.com/token', body, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		.then(({ data }: { data: AccessTokenResponse }) => data.access_token);

	return response;
}
