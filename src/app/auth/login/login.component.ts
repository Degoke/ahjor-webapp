import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService: AuthService = inject(AuthService);
  snackBar: MatSnackBar = inject(MatSnackBar);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  hidePassword = true;

  loginErrors = this.authService.loginErrors;
  loginLoading = this.authService.loginLoading;

  constructor() {
    effect(() => {
      if (this.loginErrors().length > 0) {
        this.loginErrors().forEach((error) => this.openSnackBar(error.message))
      }
    })
  }

  handleLogin() {
    this.authService.login({
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }
}
