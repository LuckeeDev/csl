import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpRes, IUser } from '@csl/shared';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '@environments/environment';

/**
 * The `user` object is on a nested property because we might need
 * to also fetch the Firebase custom token.
 */
interface UserResponse {
	user: IUser;
	token?: string;
}

/**
 * Choose whether to retrieve Firebase token or not.
 */
interface UserRequestOptions {
	firebaseToken?: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _userSubject$: BehaviorSubject<IUser> = new BehaviorSubject(
		undefined
	);

	private _checkUserSubject$: Subject<IUser> = new Subject();

	private _tokenSubject$: Subject<string> = new Subject();

	constructor(private http: HttpClient, private fireAuth: AngularFireAuth) {}

	/**
	 * @description Use in guards to check if the user exists or not
	 */
	get userCheck$(): Observable<IUser> {
		const user$ = this._userSubject$.asObservable();

		return user$.pipe(
			switchMap((value) => {
				if (value === undefined) {
					return this._checkUserSubject$.asObservable();
				} else {
					return user$;
				}
			})
		);
	}

	// get user$(): Observable<IUser> {
	// 	return this._userSubject$
	// 		.asObservable()
	// 		.pipe(map((value) => (value === undefined ? null : value)));
	// }

	get firebaseAuthToken$(): Observable<string> {
		return this._tokenSubject$.asObservable();
	}

	getUser(options?: UserRequestOptions): Observable<IHttpRes<UserResponse>> {
		/**
		 * Request Firebase signIn token alongside with the user object
		 * if `options.firebaseToken` is set to `true`.
		 */
		const queryString = options.firebaseToken
			? '/users/me?firebase=true'
			: '/users/me';

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
