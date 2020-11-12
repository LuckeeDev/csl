import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { AuthService } from '@global/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReferenteGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.user$.pipe(
      tap((user) => {
        if (!user || !user.isReferente) {
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
