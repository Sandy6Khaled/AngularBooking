// import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   FormsModule,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common';
// import { LoginComponent } from '../login/login.component';
// import { Router, RouterModule } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
// import { AccountService } from '../../Services/account.service';
// import { data } from 'jquery';
// import { RegisterUser } from '../../Models/RegisterUser';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [LoginComponent, RouterModule, HttpClientModule,FormsModule,CommonModule,ReactiveFormsModule],
//   providers: [AccountService],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css',
// })
// export class RegisterComponent {
//   newUser: RegisterUser = {
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     city: "",
//     street: "",
//     postalCode: "",
//     phoneNumber: ""
//   };
//   res:any;
//   constructor(public myService: AccountService, public router:Router) { }

//  // Validation function for the username


//   registerUser() {
//     this.myService.Register(this.newUser).subscribe({
//       next: (data) => {
//       console.log('User registered successfully',data.body);
//       this.res=data.body;
//       this.Login();
//       },
//       error: (error) => {
//       console.log("Error", error);
//       }
//     })
//   }
//   Login(){
//     console.log("Navigate to login");
    
//     this.router.navigate(['/login']);
//   }
// }
// /*response => {
//       console.log('User registered successfully', response);
//     }, error => {
//       console.error('Error registering user', error);
//     });*/



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
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from '../../Services/account.service';
import { data } from 'jquery';
import { RegisterUser } from '../../Models/RegisterUser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoginComponent, RouterModule, HttpClientModule,FormsModule,CommonModule,ReactiveFormsModule],
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
  errorMessage: string = '';

  constructor(public myService: AccountService, public router:Router) { }



  registerUser() {
    this.myService.Register(this.newUser).subscribe({
      next: (data) => {
        console.log(data.body);
        if (data.body === "Registration succeeded") {
          this.emailConfirmation();
        } else {
          this.errorMessage = data.body;
        }
      },
      error: (error) => {
        // Handle HTTP errors
        console.error("Error", error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }

  emailConfirmation(){
    console.log("Navigate to emailConfirmation");
    
    this.router.navigate(['/emailconfirmation']);
  }
}
/*response => {
      console.log('User registered successfully', response);
    }, error => {
      console.error('Error registering user', error);
    });*/