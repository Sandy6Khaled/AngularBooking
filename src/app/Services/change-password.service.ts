import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_url="https://localhost:7182/api/ChangePassword"

  changePassword(id:number)
  {
    return this.http.put(this.DB_url+"/"+id,{observe:"response",responseType:"text"}).pipe()
  }
 
}
