import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AuthService } from '@global/services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class RappreGuard implements CanLoad {
	constructor(private auth: AuthService, private router: Router) {}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {
		return this.auth.userCheck$.pipe(
			tap((user) => {
				if (user === null || user.isRappre !== true) {
					this.router.navigate(['unauthorized']);
				}
			}),
			map((user) => user.isRappre)
		);
	}
}
