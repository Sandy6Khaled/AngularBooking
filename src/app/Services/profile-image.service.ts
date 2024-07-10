import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  private readonly profileImageKey = 'profileImage';

  constructor() {}

  // Save profile image URL to localStorage
  saveProfileImage(imageUrl: string): void {
    localStorage.setItem(this.profileImageKey, imageUrl);
  }

  // Retrieve profile image URL from localStorage
  getProfileImage(): string | null {
    return localStorage.getItem(this.profileImageKey);
  }

  // Clear profile image URL from localStorage
  clearProfileImage(): void {
    localStorage.removeItem(this.profileImageKey);
  }
}
