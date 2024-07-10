import { Component, OnInit } from '@angular/core';
import { verfication } from '../../Models/Verfication';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[AdminService],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css',
})
export class VerificationComponent implements OnInit{
  verifications: verfication[] = [];
  // {
  //   id: 0,
  //   userId: 0,
  //   name: '',
  //   email: '',
  //   certificate: null,
  //   phoneNumber: 0,
  // };
  ApproveMessage:string='';
  ApproveErrorMessage:string='';
  DeclineMessage:string='';
  DeclineErrorMessage:string='';
  constructor(private readonly adminService:AdminService) { }
  ngOnInit(): void {
    this.GetUnVerifiedUsers()
  }
  GetUnVerifiedUsers(){
    this.adminService.GetUnVerifiedOwners().subscribe({
      next: (data) => {
        this.verifications = data.body;
        console.log("UnVerificatied Response",data.body);
      },
      error: (err) => {
        console.log("Error in Unverified",err);
      }
    })
  }
  approve(id:number){
    this.adminService.ApproveOwner(id).subscribe({
      next: (data) => {
        console.log("Approved Response",data);
        this.ApproveMessage=data.body;
        this.GetUnVerifiedUsers();
      },
      error: (err) => {
        console.log("Error in Approve",err);
        this.ApproveErrorMessage=err.body;
        this.GetUnVerifiedUsers();
      }
    })
  }
  decline(id:number){
    this.adminService.DeclineOwner(id).subscribe({
      next: (data) => {
        console.log("Declined Response",data.body);
        this.DeclineMessage=data.body;
        this.GetUnVerifiedUsers();
      },
      error: (err) => {
        console.log("Error in Decline",err.body);
        this.DeclineErrorMessage=err.body;
        this.GetUnVerifiedUsers();
      }
    })
  }
}
