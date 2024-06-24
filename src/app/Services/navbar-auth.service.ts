import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarAuthService {

  constructor(public token:TokenService) { }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  getUserName(): string {
    // Assuming the username is stored separately in local storage
    const userName = localStorage.getItem('userName');
    return userName || '';
  }
  Logout(){
    this.token.clearTokens();
  }
}
