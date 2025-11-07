import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  if (token && req.url.startsWith('/api')) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401/422 errors - token invalid or expired
        if (error.status === 401 || error.status === 422) {
          console.error('=== AUTHENTICATION ERROR ===');
          console.error('Status:', error.status);
          console.error('URL:', req.url);
          console.error('Error Response:', error.error);
          console.error('Error Message:', error.error?.error || error.error?.message || error.message);
          console.error('Error Details:', error.error?.details || 'No details');
          console.error('Token exists:', !!token);
          console.error('Token value:', token ? token.substring(0, 50) + '...' : 'null');
          console.error('Authorization Header:', req.headers.get('Authorization')?.substring(0, 30) + '...');
          console.error('===========================');
          authService.logout();
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  } else if (req.url.startsWith('/api') && 
             !req.url.includes('/auth/login') && 
             !req.url.includes('/auth/register') &&
             !req.url.includes('/amenities') &&
             !req.url.includes('/units') &&
             !req.url.match(/^\/api\/units(\?|$)/)) {
    // Missing token for protected route (only warn for admin/protected routes)
    if (req.url.includes('/admin/') || req.url.includes('/bookings') || req.url.includes('/auth/me')) {
      console.warn('Missing token for protected route:', req.url);
    }
  }

  return next(req);
};

