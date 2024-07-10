import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarAuthService {

  constructor(public token:TokenService,private profile:ProfileService) { }
  isLoggedIn(): boolean {
    const token = this.token.getAccessToken();
    return !!token;
  }

  getUserName(): string {
    // Assuming the username is stored separately in local storage
    const userName = this.token.getUserName();
    return userName || '';
  }
  getUserRole():string{
    const userRole = this.token.getRole();
    return userRole || '';
  }
  getUserId(){
    return this.token.getUserId();
  }
  Logout(){
    this.token.clearTokens();
  }
  static IsProfileUpdated(){
    return ProfileService.IsProfileUpdated();
  }
}
