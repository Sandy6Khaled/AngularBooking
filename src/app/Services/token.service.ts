import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  constructor() { }
   // Save tokens to localStorage
   saveTokens(accessToken: string,userName:string,userId:number,userRoles:string[]): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem('userName', userName);
    localStorage.setItem("userId",userId.toString());
    localStorage.setItem("userRoles",JSON.stringify(userRoles));
    // localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  // Get access token from localStorage
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  // Get refresh token from localStorage
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // Clear tokens from localStorage
  clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRoles");
  }
}
