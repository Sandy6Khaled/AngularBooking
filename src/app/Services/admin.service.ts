import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http:HttpClient) { }
   private readonly DB_url = "https://localhost:7182/api/Admin";

   GetUnVerifiedOwners():Observable<any>{
    return this.http.get(`${this.DB_url}/GetUnVerifiedOwners`,{observe:"response"}).pipe();
   }

   ApproveOwner(id:number):Observable<any>{
    return this.http.post(`${this.DB_url}/ApproveOwner/${id}`,{observe:"response",responseType:'text'}).pipe();
   }

   DeclineOwner(id:number):Observable<any>{
    return this.http.delete(`${this.DB_url}/DeclineOwner/${id}`,{observe:"response",responseType:'text'}).pipe();
   }

}
