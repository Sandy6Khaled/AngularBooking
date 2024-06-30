import { Component } from '@angular/core';
import { ConfirmReset } from '../../Models/ResetPassword';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../../Services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-code-form',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  providers:[AuthenticationService],
  templateUrl: './reset-password-code-form.component.html',
  styleUrl: './reset-password-code-form.component.css'
})
export class ResetPasswordCodeFormComponent {
  confirmResetModel:ConfirmReset={
    ResetCode:0,
    Email:''
  }
  errorMessage:any;
  formData = new FormData();
  constructor(private authenticationService: AuthenticationService,private router:Router) { }
  confirmReset(){
    this.formData.append('ResetCode',this.confirmResetModel.ResetCode.toString());
    this.formData.append('Email',this.confirmResetModel.Email);
    this.authenticationService.ConfirmResetPassword(this.formData).subscribe({
      next: (data) => {
        console.log("Code Reset Response",data);
        
        this.MakeNewPassword()
      },
      error: (error) => {
        console.log("Error Reset Response",error);
      }
    })
  }
  MakeNewPassword(){
    this.router.navigate(['/resetpassword']);
  }
}
