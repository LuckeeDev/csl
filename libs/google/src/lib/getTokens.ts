import { URLSearchParams } from 'url';
import axios from 'axios';

interface TokensResponse {
	access_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
	refresh_token: string;
	id_token: string;
}

const URL = 'https://oauth2.googleapis.com/token';

export async function getTokens(
	code: string,
	clientID: string,
	clientSecret: string,
	redirect: string
): Promise<TokensResponse> {
	const data = {
		code,
		client_id: clientID,
		client_secret: clientSecret,
		grant_type: 'authorization_code',
		redirect_uri: redirect,
	};

	const body = new URLSearchParams(data);

	const response: TokensResponse = await axios
		.post<any, { data: TokensResponse }>(URL, body, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
		})
		.then((res) => {
			return res.data;
		});

	return response;
}
