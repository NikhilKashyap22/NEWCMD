import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.userName, this.password).subscribe({
      next: (token) => {
        if(token != "Error"){
        this.authService.saveToken(token);
        this.router.navigate(['/dashboard']); // Redirect after login
        }else if(token === "Error"){
          this.router.navigate(['/server'])
        }
      },
      // error: (error) => {
      //   this.errorMessage = error.message;
      // }
    });
  }

}
