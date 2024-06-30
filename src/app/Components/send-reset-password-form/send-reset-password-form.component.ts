import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import { ResetRequest } from '../../Models/ResetPassword';
import { ResetPasswordCodeFormComponent } from '../reset-password-code-form/reset-password-code-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-reset-password-form',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  providers:[AuthenticationService,ResetPasswordCodeFormComponent],
  templateUrl: './send-reset-password-form.component.html',
  styleUrl: './send-reset-password-form.component.css'
})
export class SendResetPasswordFormComponent {
  errorMessage:any;
  resetRequest:ResetRequest={
    Email:''
  }
  resultMessage:any;
  formData = new FormData();
  constructor(private authenticationService: AuthenticationService,private router:Router) { }
  requestPasswordReset(){
    this.formData.append('Email',this.resetRequest.Email);
    this.authenticationService.SendResetPasswordRequest(this.formData).subscribe({
      next:(res)=>{
        console.log("SendResetRequest Response",res);
        this.resultMessage=res.body;
        this.Code();
      },
      error:(err)=>{
        console.log("Error in Sending Reset Request",err);
        this.errorMessage="OPPS!! Something Went Wrong, Try Again Later."
        
      }
    })
  }
  Code(){
    this.router.navigate(['/resetcode']);
  }
}
