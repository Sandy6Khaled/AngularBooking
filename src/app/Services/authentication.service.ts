import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../Models/LoginUser';
import { Observable } from 'rxjs';
import { LoginResponse } from '../Models/LoginResponse';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly http:HttpClient,private readonly token:TokenService) { }
  private readonly DB_url = "https://localhost:7182/api/Authentication";
  Login(loginUser: LoginUser): Observable<any>{
    return this.http.post<LoginResponse>(this.DB_url,loginUser,{observe:"response",responseType:"json"}).pipe();
  }
  handleLoginResponse(response: LoginResponse): void {
    const { accessToken } = response;
    this.token.saveTokens(accessToken,response.refreshToken.userName,response.refreshToken.userId,response.refreshToken.userRoles);
  }
}
