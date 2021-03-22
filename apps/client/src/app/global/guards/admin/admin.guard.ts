import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@global/services/auth/auth.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanLoad {
	constructor(private auth: AuthService, private router: Router) {}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {
		return this.auth.checkUser$().pipe(
			tap((user) => {
				if (user === null || user.isAdmin !== true) {
					this.router.navigate(['404']);
				}
			}),
			map((user) => user.isAdmin)
		);
	}
}
