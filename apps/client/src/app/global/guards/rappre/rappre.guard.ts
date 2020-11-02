import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AuthService } from '@global/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RappreGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      tap((user) => {
        if (!user || !user.isRappre) {
          this.router.navigate(['unauthorized']);
        }
      }),
      map((user) => user.isRappre)
    );
  }
}
