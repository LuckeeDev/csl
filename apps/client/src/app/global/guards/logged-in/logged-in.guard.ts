import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanLoad,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { AuthState } from '@/global/store/auth';
import { IUser } from '@csl/shared';
import { firstDifferentThan } from '@/utils/operators/firstDifferentThan';

@Injectable({
	providedIn: 'root',
})
export class LoggedInGuard implements CanActivate, CanLoad {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	constructor(private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		const url = state.url.split('/');
		url.shift();
		const str = url.join('+');

		return this.user$.pipe(
			firstDifferentThan(undefined),
			map((user) =>
				user !== null ? true : this.router.parseUrl(`login/${str}`)
			)
		);
	}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {
		return this.user$.pipe(
			firstDifferentThan(undefined),
			tap((user) => {
				if (user === null) {
					this.router.navigate(['login']);
				}
			}),
			map((user) => user !== null)
		);
	}
}
