import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpRes, IUser } from '@csl/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<IUser>;

  constructor(private http: HttpClient, private fireAuth: AngularFireAuth) {}

  getUser(): void {
    this.user$ = this.http.get<IHttpRes<{ user: IUser, token: string }>>('/auth')
      .pipe(
        map((res) => {
          if (res.success) {
            this.fireAuth.signInWithCustomToken(res.data.token).then();

            return res.data.user;
          }

          return null;
        })
      );
  }

  signIn(next?: string): void {
    window.location.replace(`${environment.api}/auth/${next || 'dashboard'}`);
  }

  signOut(): void {
    this.fireAuth.signOut().then(() => {
      window.location.replace(`${environment.api}/auth/logout`);
    });
  }
}
