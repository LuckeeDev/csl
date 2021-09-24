import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StrapiAuthResponse } from '@csl/types';

@Injectable()
export class StrapiAuthService {
	private _googleURL = 'http://localhost:1337/connect/google';
	private _tokenURL =
		'http://localhost:1337/auth/google/callback?access_token=';

	constructor(private http: HttpClient, private activated: ActivatedRoute) {}

	redirectToLogin() {
		window.location.href = this._googleURL;
	}

	getProfile(): Observable<StrapiAuthResponse> {
		const route = this.activated.snapshot;

		return this.http.get<StrapiAuthResponse>(
			`${this._tokenURL}${route.queryParams.access_token}`
		);
	}
}
