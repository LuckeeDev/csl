import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StrapiAuthResponse, StrapiUser } from '@csl/types';
import { Apollo } from 'apollo-angular';
import { GET_LOGGEDIN_USER } from './strapi-auth.queries';

@Injectable()
export class StrapiAuthService {
	private _googleURL = 'http://localhost:1337/connect/google';
	private _authURL = 'http://localhost:1337/auth';

	constructor(private http: HttpClient, private apollo: Apollo) {}

	redirectToLogin() {
		window.location.href = this._googleURL;
	}

	getProfile(
		provider: string,
		accessToken: string
	): Observable<StrapiAuthResponse | { user: StrapiUser }> {
		if (provider && accessToken) {
			return this.http.get<StrapiAuthResponse>(
				`${this._authURL}/${provider}/callback?access_token=${accessToken}`
			);
		} else {
			return this.apollo
				.watchQuery<{ me: StrapiUser }>({
					query: GET_LOGGEDIN_USER,
				})
				.valueChanges.pipe(
					map(({ data: { me } }) => ({
						user: me,
					}))
				);
		}
	}
}
