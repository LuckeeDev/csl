import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '@csl/shared';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // User object
  user$: Observable<IUser>;

  constructor(private http: HttpClient, private router: Router) {}

  // Get user
  getUser(): void {
    this.user$ = this.http.get<IUser>('/api/auth/getprofile');
  }

  // Sign in
  signIn(): void {
    window.location.replace('/api/auth');
  }

  // Sign out
  signOut(): void {
    window.location.replace('/api/auth/logout');
  }
}
