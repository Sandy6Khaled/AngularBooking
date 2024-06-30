import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../Services/profile.service';
import { UpdateProfile, profile } from '../../Models/Profile';
import { TokenService } from '../../Services/token.service';
import { NavbarAuthService } from '../../Services/navbar-auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule,RouterModule],
  providers: [ProfileService, TokenService],
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
  constructor(
    private profileService: ProfileService,
    private navAuthService: NavbarAuthService,
    private router: Router
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
        console.log('Profile', data.body);
        console.log('User Profile', this.userProfile);
      },
      error: (err) => {
        console.log('Profile Error', err);
      },
    });
  }
  }
