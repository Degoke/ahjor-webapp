import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { audit } from 'rxjs';
import { authGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        title: 'Login',
        component: LoginComponent
      },
      {
        path: 'signup',
        title: 'Signup',
        component: SignupComponent
      }
    ],
  },
  {
    path: '',
    title: 'Homepage',
    component: HomeComponent,
    canActivate: [authGuard],
  },
];
