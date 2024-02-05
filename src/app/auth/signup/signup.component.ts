import { Component, effect, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  authService: AuthService = inject(AuthService);
  snackBar: MatSnackBar = inject(MatSnackBar);

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  })

  hidePassword = true;

  signupErrors = this.authService.signupErrors;
  signupLoading = this.authService.signupLoading;

  constructor() {
    effect(() => {
      if (this.signupErrors().length > 0) {
        this.signupErrors().forEach((error) => this.openSnackBar(error.message))
      }
    })
  }

  handleSignup() {
    this.authService.signup({
      email: this.signupForm.value.email || '',
      password: this.signupForm.value.password || '',
      firstName: this.signupForm.value.firstName || '',
      lastName: this.signupForm.value.lastName || ''
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }
}
