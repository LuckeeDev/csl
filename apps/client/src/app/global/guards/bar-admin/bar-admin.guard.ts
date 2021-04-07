import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { AuthState } from '@/global/store/auth';
import { IUser } from '@csl/shared';
import { firstDifferentThan } from '@/utils/operators/firstDifferentThan';

@Injectable({
	providedIn: 'root',
})
export class BarAdminGuard implements CanLoad {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	constructor(private router: Router) {}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {
		return this.user$.pipe(
			firstDifferentThan(undefined),
			tap((user) => {
				if (user === null || user.isBar !== true) {
					this.router.navigate(['unauthorized']);
				}
			}),
			map((user) => user.isBar)
		);
	}
}
