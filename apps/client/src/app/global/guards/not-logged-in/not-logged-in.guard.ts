import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { AuthService } from '@global/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class NotLoggedInGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {}

	canActivate():
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.auth.userCheck$.pipe(
			map((user) => (user === null ? true : this.router.parseUrl('dashboard')))
		);
	}
}
