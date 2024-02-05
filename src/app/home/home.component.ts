import { Component, inject } from '@angular/core';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userService: UserService = inject(UserService);

  currentUser = this.userService.currentUser;

  ngOnInit() {
    this.userService.getCurrentUser();
  }
}
