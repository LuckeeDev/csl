import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '@global/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class QpAdminGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      tap((user) => {
        if (!user || !user.isQp) {
          this.router.navigate(['unauthorized']);
        }
      }),
      map((user) => user.isQp)
    );
  }
}
