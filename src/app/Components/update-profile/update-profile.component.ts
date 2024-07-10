import { Component, Input, OnInit } from '@angular/core';
import { UpdateProfile } from '../../Models/Profile';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../Services/profile.service';
import { NavbarAuthService } from '../../Services/navbar-auth.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileUpdateServiceService } from '../../Services/profile-update-service.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule,RouterModule],
  providers: [ProfileService, NavbarAuthService,ProfileUpdateServiceService],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent implements OnInit {
  updateProfile: UpdateProfile = {
    userId: 0,
    email: '',
    image: [],
    city: '',
    street: '',
    postalCode: '',
    phoneNumber: '',
  };
  @Input() profileToUpdate: any;
  formData: FormData = new FormData();
  userId: number = 0;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private navAuthService: NavbarAuthService,
    private router: Router,
    private profileUpdateService:ProfileUpdateServiceService
  ) {}
  ngOnInit(): void {
    this.userId = +this.navAuthService.getUserId();
    // console.log("Profile to Update",this.profileToUpdate);
    const state = history.state;
    if (state && state.profileToUpdate) {
      this.updateProfile = { ...state.profileToUpdate, userId: this.userId };
      console.log("Profile to Update",this.updateProfile);
    }
    
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.updateProfile.image = event.target.files[0];
    }
  }
  UpdateProfile() {
    this.formData.append('UserId', this.navAuthService.getUserId());
    this.formData.append('Email', this.updateProfile.email);
    if (this.updateProfile.image) {
      this.formData.append('Image', this.updateProfile.image);
    }
    this.formData.append('City', this.updateProfile.city);
    this.formData.append('Street', this.updateProfile.street);
    this.formData.append('PostalCode', this.updateProfile.postalCode);
    this.formData.append('PhoneNumber', this.updateProfile.phoneNumber);

    this.profileService.UpdateProfile(this.formData).subscribe({
      next: (data) => {
        console.log('Profile Updated', data.body);
        // this.GetupdateProfile();
        this.profileUpdateService.notifyProfileUpdated();
        this.profile();
      },
      error: (err) => {
        console.log('Profile Error', err);
      },
    });
  }
  profile() {
    this.router.navigate(['../profile']);
  }
}
