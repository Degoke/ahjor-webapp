import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { AppService } from './app.service';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

export const GlobalErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const appService: AppService = inject(AppService);
  const router: Router = inject(Router);

  return next(req).pipe(
    tap((event) => { appService.hasNetworkError.set(false)} ),
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 0:
          appService.hasNetworkError.set(true);
          break;
        default:
          //
      }
      throw error;
    })
  )
};

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getAuthToken();
  
  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    })
  }

  return next(req);
}
