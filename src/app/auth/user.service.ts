import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { map, catchError, of, finalize } from 'rxjs';
import { ErrorResponse } from '../shared/error-response.type';
import { User } from '../shared/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUrl = "http://localhost:8080/api/user";

  http: HttpClient = inject(HttpClient);

  currentUserLoading = signal<boolean>(false);
  currentUserError = signal<ErrorResponse | null>(null);
  currentUser = signal<User | null>(null);

  constructor() {}

  getCurrentUser() {
    this.currentUserLoading.set(true);
    this.http.get<User>(`${this.baseUrl}/me`).pipe(
      map((data) => {
        console.log("data", data);
        return data;
      }),
      catchError((err) => {
        console.log("error", err)
        this.currentUserError.set({
          statusCode: err.error.statusCode ?? err.error.status,
          message: err.error.message
        })
        return of([]);
      }),
      finalize(() => this.currentUserLoading.set(false))
    ).subscribe(
      res => {
        console.log('res', res)
        this.currentUser.set(res as User);
        return res;
      },
    );
  }
}
