import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '@csl/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<IUser>;

  constructor(private http: HttpClient) {}

  getUser(): void {
    this.user$ = this.http.get<IUser>('/api/auth');
  }

  signIn(next?: string): void {
    window.location.replace(`/api/auth/${next || 'dashboard'}`);
  }

  signOut(): void {
    window.location.replace('/api/auth/logout');
  }
}
