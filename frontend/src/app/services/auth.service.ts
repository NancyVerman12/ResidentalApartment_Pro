import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';
  private platformId = inject(PLATFORM_ID);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private router = inject(Router);

  constructor(private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      if (token) {
        this.getCurrentUser().subscribe();
      }
    }
  }

  private get localStorage(): Storage | null {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage;
    }
    return null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (this.localStorage) {
          this.localStorage.setItem('token', response.access_token);
        }
        this.currentUserSubject.next(response.user);
      })
    );
  }

  register(username: string, email: string, password: string, role: string = 'user'): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, {
      username,
      email,
      password,
      role
    }).pipe(
      tap(response => {
        if (this.localStorage) {
          this.localStorage.setItem('token', response.access_token);
        }
        this.currentUserSubject.next(response.user);
      })
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/me`).pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }

  logout(): void {
    if (this.localStorage) {
      this.localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (this.localStorage) {
      return this.localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'admin';
  }
}

