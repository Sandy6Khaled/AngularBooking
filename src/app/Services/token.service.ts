// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {
//   private readonly ACCESS_TOKEN_KEY = 'accessToken';
//   private readonly REFRESH_TOKEN_KEY = 'refreshToken';
//   constructor() { }
//    // Save tokens to localStorage
//    saveTokens(accessToken: string,userName:string,userId:number,userRoles:string[]): void {
//     localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
//     localStorage.setItem('userName', userName);
//     localStorage.setItem("userId",userId.toString());
//     localStorage.setItem("userRoles",JSON.stringify(userRoles));
//     // localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
//   }

//   // Get access token from localStorage
//   getAccessToken(): string | null {
//     return localStorage.getItem(this.ACCESS_TOKEN_KEY);
//   }

//   // Get refresh token from localStorage
//   getRefreshToken(): string | null {
//     return localStorage.getItem(this.REFRESH_TOKEN_KEY);
//   }

//   // Clear tokens from localStorage
//   clearTokens(): void {
//     localStorage.removeItem(this.ACCESS_TOKEN_KEY);
//     localStorage.removeItem(this.REFRESH_TOKEN_KEY);
//     localStorage.removeItem("userName");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userRoles");
//   }
// }
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
 
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  constructor(private cookieService: CookieService) { }
  // Save tokens to cookies
  saveTokens(accessToken: string, userName: string, userId: number, userRoles: string[]): void {
    const options = { expires: 7, path: '/' }; // Expires in 7 days, accessible throughout the site
 
    this.cookieService.set(this.ACCESS_TOKEN_KEY, accessToken, options);
    this.cookieService.set('userName', userName, options);
    this.cookieService.set("userId", userId.toString(), options);
    this.cookieService.set("userRoles", JSON.stringify(userRoles), options);
    // this.cookieService.set(this.REFRESH_TOKEN_KEY, refreshToken, options);
  }
 
  // Get access token from cookies
  getAccessToken(): string {
    return this.cookieService.get(this.ACCESS_TOKEN_KEY);
  }
 
  // Get refresh token from cookies
  getRefreshToken(): string {
    return this.cookieService.get(this.REFRESH_TOKEN_KEY);
  }
  getUserName():string{
    return this.cookieService.get("userName");
  }
 getRole(){
  return this.cookieService.get("userRoles");
 }
 getUserId(){
  return this.cookieService.get("userId");
 }
  // Clear tokens from cookies
  clearTokens(): void {
    this.cookieService.delete(this.ACCESS_TOKEN_KEY);
    this.cookieService.delete(this.REFRESH_TOKEN_KEY);
    this.cookieService.delete('userName');
    this.cookieService.delete('userId');
    this.cookieService.delete('userRoles');
  }
}