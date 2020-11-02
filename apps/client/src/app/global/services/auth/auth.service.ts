// Main imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '@app/global/@types/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // User object
  user$: Observable<UserInterface>;

  constructor(private http: HttpClient, private router: Router) {}

  // Get user
  getUser(): void {
    this.user$ = this.http.get<UserInterface>('/api/auth/getprofile');
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
