import { Injectable } from '@angular/core';
import { CanLoad, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '@global/services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class ReferenteGuard implements CanLoad {
	constructor(private auth: AuthService, private router: Router) {}

	canLoad():
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.auth.checkUser$().pipe(
			tap((user) => {
				if (user === null || !user.isReferente) {
					this.router.navigate(['unauthorized']);
				}
			}),
			map((user) => {
				if (user.isReferente) {
					return true;
				} else {
					return false;
				}
			})
		);
	}
}
