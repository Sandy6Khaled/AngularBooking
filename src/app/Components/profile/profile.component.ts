import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../Services/profile.service';
import { UpdateProfile, profile } from '../../Models/Profile';
import { TokenService } from '../../Services/token.service';
import { NavbarAuthService } from '../../Services/navbar-auth.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileImageService } from '../../Services/profile-image.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule,RouterModule],
  providers: [ProfileService, TokenService,NavbarAuthService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userProfile: profile = {
    email: '',
    userName: '',
    image: '', // Replace with actual image URL or base64 string if available
    city: '',
    street: '',
    postalCode: '',
    phoneNumber: '',
  };
  @Output() profileData:EventEmitter<any>=new EventEmitter<any>();
  userId:number=0;
  updatedImageUrl:any;
  profileDeleteMessage:any;
  constructor(
    private profileService: ProfileService,
    private navAuthService: NavbarAuthService,
    private router: Router,
    private profileImageService:ProfileImageService,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {
    this.userId = +this.navAuthService.getUserId();
    this.GetUserProfile();
  }
  GetUserProfile() {
    this.profileService.GetClientData(this.userId).subscribe({
      next: (data) => {
        this.userProfile = data.body;
        this.profileData.emit(this.userProfile);
        this.updatedImageUrl=this.userProfile.image;
        this.updateProfileImage();
        console.log('Profile', data.body);
        console.log('User Profile', this.userProfile);
      },
      error: (err) => {
        console.log('Profile Error', err);
      },
    });
  }
  editProfile() {
    this.router.navigate(['updateprofile'], {
      state: { profileToUpdate: this.userProfile }
    });
  }
  updateProfileImage(): void {
     // Replace with your actual image URL
    this.profileImageService.saveProfileImage(this.updatedImageUrl);
    console.log("Image URL Updated",this.updatedImageUrl);
    
  }
  DeleteProfile(){
    this.profileService.DeleteProfile(this.userId).subscribe({
      next: (data) => {
        this.profileDeleteMessage=data.body;
        console.log('Profile Deleted', data.body);
        this.Home();
        this.tokenService.clearTokens();
      },
      error: (err) => {
        console.log('Profile Delete Error', err);
      }
    })
  }
  Home(){
    this.router.navigate(['home']);
  }
}