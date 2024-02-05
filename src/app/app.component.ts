import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ahjor';

  snackBar: MatSnackBar = inject(MatSnackBar);
  appService: AppService = inject(AppService);

  hasNetworkError = this.appService.hasNetworkError;

  constructor() {
    effect(() => {
      if (this.hasNetworkError()) {
        this.openSnackBar("An error occured with your network");
      }
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }
}
