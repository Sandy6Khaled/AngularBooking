import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../Models/RegisterUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_url = "https://localhost:7182/api/Account";
  Register(registerUser : RegisterUser): Observable<any>{
    return this.http.post(this.DB_url,registerUser,{observe:"response",responseType: "text"}).pipe();
  }
}
