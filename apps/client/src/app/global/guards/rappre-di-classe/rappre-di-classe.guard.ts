import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '@/global/store/auth';
import { IUser } from '@csl/shared';
import { firstDifferentThan } from '@/utils/operators/firstDifferentThan';
import { map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class RappreDiClasseGuard implements CanActivate {
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
			tap((user) => {
				if (user === null || !user.isRappreDiClasse) {
					this.router.navigate(['unauthorized']);
				}
			}),
			map((user) => (user !== null ? true : false))
		);
	}
}
