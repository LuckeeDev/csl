import { AuthState } from '@/global/store/auth';
import { firstDifferentThan } from '@/utils/operators/firstDifferentThan';
import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { IUser } from '@csl/shared';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class NotLoggedInGuard implements CanActivate {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	constructor(private router: Router) {}

	canActivate():
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.user$.pipe(
			firstDifferentThan(undefined),
			map((user) => (user === null ? true : this.router.parseUrl('dashboard')))
		);
	}
}
