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
import { AuthService } from '@global/services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class LoggedInGuard implements CanActivate, CanLoad {
	constructor(private auth: AuthService, private router: Router) {}

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

		return this.auth.checkUser$().pipe(
			map((user) => {
				if (user !== null) {
					return true;
				} else {
					return this.router.parseUrl(`login/${str}`);
				}
			})
		);
	}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {
		return this.auth.checkUser$().pipe(
			tap((user) => {
				if (user === null) {
					this.router.navigate(['login']);
				}
			}),
			map((user) => (user !== null ? true : false))
		);
	}
}
