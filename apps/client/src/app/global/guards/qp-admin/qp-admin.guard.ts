import { AuthState } from '@/global/store/auth';
import { firstDifferentThan } from '@/utils/operators/firstDifferentThan';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { IUser } from '@csl/shared';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class QpAdminGuard implements CanLoad {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	constructor(private router: Router) {}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {
		return this.user$.pipe(
			firstDifferentThan(undefined),
			tap((user) => {
				if (user === null || user.isQp !== true) {
					this.router.navigate(['unauthorized']);
				}
			}),
			map((user) => user.isQp)
		);
	}
}
