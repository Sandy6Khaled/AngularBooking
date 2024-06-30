import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import { NewPassword } from '../../Models/ResetPassword';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-reset-password-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [AuthenticationService],
  templateUrl: './new-reset-password-form.component.html',
  styleUrl: './new-reset-password-form.component.css',
})
export class NewResetPasswordFormComponent {
  newPasswordModel: NewPassword = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
  };
  formData = new FormData();
  errorMessage: any;
  resultMessage: any;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  confirmReset() {
    this.formData.append('Email', this.newPasswordModel.Email);
    this.formData.append('Password', this.newPasswordModel.Password);
    this.formData.append(
      'ConfirmPassword',
      this.newPasswordModel.ConfirmPassword
    );
    this.authenticationService.ResetPassword(this.formData).subscribe({
      next: (data) => {
        console.log('New Password Response', data);
        this.resultMessage = 'Your Password Updated Successfully';
        setTimeout(() => this.Home(), 5000);
      },
      error: (error) => {
        console.log('New Password Error', error);
        this.errorMessage = 'OPPS!!! SOmething Went Wrong';
      },
    });
  }
  Home() {
    this.router.navigate(['home']);
  }
}
