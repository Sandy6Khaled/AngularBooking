import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarAuthService {

  constructor(public token:TokenService) { }
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
  Logout(){
    this.token.clearTokens();
  }
}
