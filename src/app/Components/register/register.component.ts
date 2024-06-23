import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from '../../Services/account.service';
import { data } from 'jquery';
import { RegisterUser } from '../../Models/RegisterUser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoginComponent, RouterModule, HttpClientModule,FormsModule,ReactiveFormsModule],
  providers: [AccountService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  newUser: RegisterUser = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    street: "",
    postalCode: "",
    phoneNumber: ""
  };
  res:any;
  constructor(public myService: AccountService, public router:Router) { }
  registerUser() {
    this.myService.Register(this.newUser).subscribe({
      next: (data) => {
      console.log('User registered successfully',data.body);
      this.res=data.body;
      this.Login();
      },
      error: (error) => {
      console.log("Error", error);
      }
    })
  }
  Login(){
    console.log("Navigate to login");
    
    this.router.navigate(['/login']);
  }
}
/*response => {
      console.log('User registered successfully', response);
    }, error => {
      console.error('Error registering user', error);
    });*/