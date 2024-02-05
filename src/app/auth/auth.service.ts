import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, map, of } from 'rxjs';
import { LoginRequest, SignupRequest } from './auth.types';
import { ErrorResponse } from '../shared/error-response.type';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseUrl = "http://localhost:8080/api/auth";
  STORAGE_KEY = "bearer_token";

  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  isLoggedIn = signal<boolean>(false);

  loginLoading = signal<boolean>(false);
  loginErrors = signal<ErrorResponse[]>([]);

  signupLoading = signal<boolean>(false);
  signupErrors = signal<ErrorResponse[]>([]);

  constructor() {
    const token = localStorage.getItem(this.STORAGE_KEY);
    // TODO: add expiry to token
    if (token) {
      this.isLoggedIn.set(true);
    }
  }

  getAuthToken() {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  login(loginRequest: LoginRequest) {
    console.log(loginRequest);
    this.loginLoading.set(true);
    this.http.post<any>(`${this.baseUrl}/login`, loginRequest).pipe(
      map((res) => {
        localStorage.setItem(this.STORAGE_KEY, res.token);
        this.isLoggedIn.set(true);
        this.router.navigate(['']);
        return res;
      }),
      catchError((err) => {
        this.loginErrors.update(errors => [...errors, {
          statusCode: err.error.statusCode,
          message: err.error.message
        }])
        console.log("error", err)
        return of([]);
      }),
      finalize(() => this.loginLoading.set(false))
    ).subscribe(
      res => {
        console.log('res', res)
      },
    );
  }

  signup(signupRequest: SignupRequest) {
    console.log(signupRequest);
    this.loginLoading.set(true);
    this.http.post<any>(`${this.baseUrl}/signup`, signupRequest).pipe(
      map((res) => {
        localStorage.setItem(this.STORAGE_KEY, res.token);
        this.isLoggedIn.set(true);
        return res;
      }),
      catchError((err) => {
        this.loginErrors.update(errors => [...errors, {
          statusCode: err.error.statusCode,
          message: err.error.message
        }])
        console.log("error", err)
        return of([]);
      }),
      finalize(() => this.loginLoading.set(false))
    ).subscribe(
      res => {
        console.log('res', res)
        return res;
      },
    );
  }
}
