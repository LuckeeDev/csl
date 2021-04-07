import { Injectable } from '@angular/core';
import { CanLoad, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '@global/services/auth/auth.service';
import { Select } from '@ngxs/store';
import { AuthState } from '@/global/store/auth';
import { IUser } from '@csl/shared';
import { firstDifferentThan } from '@/utils/operators/firstDifferentThan';

@Injectable({
	providedIn: 'root',
})
export class ReferenteGuard implements CanLoad {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	constructor(private auth: AuthService, private router: Router) {}

	canLoad():
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.user$.pipe(
			firstDifferentThan(undefined),
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
