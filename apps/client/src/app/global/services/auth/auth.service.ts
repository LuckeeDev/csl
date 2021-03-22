import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpRes, IUser } from '@csl/shared';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '@environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _userSubject$: BehaviorSubject<IUser> = new BehaviorSubject(
		undefined
	);

	constructor(private http: HttpClient, private fireAuth: AngularFireAuth) {}

	get user$(): Observable<IUser> {
		const userObservable$ = this._userSubject$.asObservable();

		return this._userSubject$.pipe(
			switchMap((value) => {
				if (value === undefined) {
					return this.getUser();
				} else {
					return userObservable$;
				}
			})
		);
	}

	getUser(): Observable<IUser> {
		return this.http
			.get<IHttpRes<{ user: IUser; token: string }>>('/auth')
			.pipe(
				map((res) => {
					const user = res.success === true ? res.data.user : null;

					if (res.success === true) {
						this.fireAuth.signInWithCustomToken(res.data.token).then();
					}

					this._userSubject$.next(user);

					return user;
				})
			);
	}

	signIn(next?: string): void {
		window.location.replace(`${environment.api}/auth/${next || 'dashboard'}`);
	}

	signOut(): void {
		this.fireAuth.signOut().then(() => {
			window.location.replace(`${environment.api}/auth/logout`);
		});
	}
}
