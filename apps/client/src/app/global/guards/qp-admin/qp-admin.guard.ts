import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '@global/services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class QpAdminGuard implements CanLoad {
	constructor(private auth: AuthService, private router: Router) {}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {
		return this.auth.userCheck$.pipe(
			tap((user) => {
				if (user === null || user.isQp !== true) {
					this.router.navigate(['unauthorized']);
				}
			}),
			map((user) => user.isQp)
		);
	}
}
