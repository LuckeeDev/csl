import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrapiAuthResponse } from '@csl/types';

@Injectable()
export class StrapiAuthService {
	private _googleURL = 'http://localhost:1337/connect/google';
	private _authURL = 'http://localhost:1337/auth';

	constructor(private http: HttpClient) {}

	redirectToLogin() {
		window.location.href = this._googleURL;
	}

	getProfile(
		provider: string,
		accessToken: string
	): Observable<StrapiAuthResponse> {
		return this.http.get<StrapiAuthResponse>(
			`${this._authURL}/${provider}/callback?access_token=${accessToken}`
		);
	}
}
