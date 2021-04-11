import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpRes, IUser, PlatformStatus } from '@csl/shared';
import { from, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '@environments/environment';

/**
 * The `user` object is on a nested property because we might need
 * to also fetch the Firebase custom token.
 */
interface UserResponse {
	user: IUser;
	token?: string;
	platformStatus?: PlatformStatus[];
}

/**
 * Choose whether to retrieve Firebase token or not.
 */
interface UserRequestOptions {
	firebaseToken: boolean;
	platformStatus: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient, private fireAuth: AngularFireAuth) {}

	getUser(options: UserRequestOptions): Observable<IHttpRes<UserResponse>> {
		/**
		 * Request Firebase signIn token alongside with the user object
		 * if `options.firebaseToken` is set to `true` and platform status
		 * if `options.platformStatus` is set to `true`.
		 */
		const queryString = `/users/me?firebase=${options.firebaseToken}&status=${options.platformStatus}`;

		return this.http.get<IHttpRes<UserResponse>>(queryString);
	}

	signIn(next?: string): void {
		window.location.replace(`${environment.api}/auth/${next || 'dashboard'}`);
	}

	firebaseSignIn(token: string) {
		return from(this.fireAuth.signInWithCustomToken(token));
	}

	signOut(): void {
		this.fireAuth.signOut().then(() => {
			window.location.replace(`${environment.api}/auth/logout`);
		});
	}
}
