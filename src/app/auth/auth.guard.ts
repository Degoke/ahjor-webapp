import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isLoggedIn;

  if (!isLoggedIn()) {
    return inject(Router).createUrlTree(['/', 'auth', 'login']);
  }

  return true;
};