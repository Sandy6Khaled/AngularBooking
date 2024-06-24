import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../../Services/authentication.service';
import { LoginUser } from '../../Models/LoginUser';
import { LoginResponse, isLoginResponse } from '../../Models/LoginResponse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule, 
    RegisterComponent, 
    CommonModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChangePasswordComponent
  ],
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  User: LoginUser = {
    email: '',
    password: '',
  };
  loginRes: LoginResponse = {
    accessToken: '',
    refreshToken: {
      userName: '',
      token: '',
      expireDate: '',
    },
  };
  errorMessage: string = '';
  constructor(public myService: AuthenticationService, public router: Router) {}
  LoginUser() {
    this.myService.Login(this.User).subscribe({
      next: (res) => {
        if (isLoginResponse(res.body)) {
          console.log(res.body);
          this.loginRes = res.body;
          this.myService.handleLoginResponse(this.loginRes);
          this.Home();
        }else{
          this.errorMessage=res.body;
        }
      },
      error: (err) => {
        console.error("Error", err);
        this.errorMessage = 'Invalid email or password';
      },
    });
  }
  Home() {
    this.router.navigate(['home']);
  }
}
