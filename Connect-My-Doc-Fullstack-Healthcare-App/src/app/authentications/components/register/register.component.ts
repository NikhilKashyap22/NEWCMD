import { User } from './../../models/auth.models';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user:User = {username:'',password:'',role:'ADMIN'}
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.message = 'Registration successful! You can now login.';
        this.router.navigate(['/login']);
        console.log(this.user);
      },
      error: () => {
        this.message = 'Registration failed!';
      }
    });
  }
}
