import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanLoad,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
	UrlSegment,
	Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { AuthState } from '@/modules/auth/store';
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

	canLoad(
		route: Route,
		segments: UrlSegment[]
	): Observable<boolean> | Promise<boolean> | boolean {
		const next = segments.map((s) => s.path).join('+');

		return this.user$.pipe(
			firstDifferentThan(undefined),
			tap((user) => {
				if (user === null) {
					this.router.navigate(['login', next]);
				}
			}),
			map((user) => user !== null)
		);
	}
}
