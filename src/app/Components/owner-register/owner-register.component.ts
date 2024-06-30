import { Component } from '@angular/core';
import { OwnerRegister } from '../../Models/RegisterUser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-register',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [AccountService],
  templateUrl: './owner-register.component.html',
  styleUrl: './owner-register.component.css',
})
export class OwnerRegisterComponent {
  newUser: OwnerRegister = {
    UserName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    City: '',
    Street: '',
    PostalCode: '',
    PhoneNumber: '',
    Certificate: [] 
  };
  errorMessage: any;
  formData = new FormData();
  constructor(
    private readonly registerService: AccountService,
    private readonly router: Router
  ) {}
  registerUser() {
    // Handle form
    this.formData.append('UserName', this.newUser.UserName);
    this.formData.append('Email', this.newUser.Email);
    this.formData.append('Password', this.newUser.Password);
    this.formData.append('ConfirmPassword', this.newUser.ConfirmPassword);
    this.formData.append('City', this.newUser.City);
    this.formData.append('Street', this.newUser.Street);
    this.formData.append('PostalCode', this.newUser.PostalCode);
    this.formData.append('PhoneNumber', this.newUser.PhoneNumber);
    for (let i = 0; i < this.newUser.Certificate.length; i++) {
      this.formData.append('Certificate', this.newUser.Certificate[i]);
    }
    this.formData.forEach((value, key) => {
      console.log(key, value);
    });
    this.registerService.OwnerRegister(this.formData).subscribe({
      next: (res) => {
        console.log('Owner Registration', res.body);
        this.OwnerConfirmation();
      },
      error: (err) => {
        console.log('Error Owner Registration', err);
        this.errorMessage = 'Registration failed. Please try again.';
      },
    });
  }

  onCertificateChange(event: any) {
    this.newUser.Certificate = event.target.files;
    if (event.target.files.length > 0) {
      this.newUser.Certificate = Array.from(event.target.files);
    }
  }
  OwnerConfirmation() {
    console.log('Navigate to OwnerRegistrationConfirmation');
    this.router.navigate(['/emailconfirmation']);
  }
}
