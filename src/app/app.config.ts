import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor, GlobalErrorInterceptor } from './app.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        GlobalErrorInterceptor,
        AuthInterceptor
      ])
    ),
    provideAnimationsAsync(),
    provideAnimationsAsync()
  ]
};
