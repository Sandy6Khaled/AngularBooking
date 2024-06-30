import { Component, Input, OnInit } from '@angular/core';
import { UpdateProfile } from '../../Models/Profile';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../Services/profile.service';
import { NavbarAuthService } from '../../Services/navbar-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [ProfileService, NavbarAuthService],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent implements OnInit {
  updateProfile: UpdateProfile = {
    UserId: 0,
    Email: '',
    Image: [],
    City: '',
    Street: '',
    PostalCode: '',
    PhoneNumber: '',
  };
  @Input() profileToUpdate: any;
  formData: FormData = new FormData();
  userId: number = 0;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private navAuthService: NavbarAuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userId = +this.navAuthService.getUserId();
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.updateProfile.Image = event.target.files[0];
    }
  }
  UpdateProfile() {
    this.formData.append('UserId', this.navAuthService.getUserId());
    this.formData.append('Email', this.updateProfile.Email);
    if (this.updateProfile.Image) {
      this.formData.append('Image', this.updateProfile.Image);
    }
    this.formData.append('City', this.updateProfile.City);
    this.formData.append('Street', this.updateProfile.Street);
    this.formData.append('PostalCode', this.updateProfile.PostalCode);
    this.formData.append('PhoneNumber', this.updateProfile.PhoneNumber);

    this.profileService.UpdateProfile(this.formData).subscribe({
      next: (data) => {
        console.log('Profile Updated', data.body);
        // this.GetupdateProfile();
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
