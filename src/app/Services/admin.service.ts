import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http:HttpClient) { }
   private readonly DB_url = "https://localhost:7182/api/Admin";

   GetUnVerifiedOwners(){
    return this.http.get(this.DB_url+"/GetUnVerifiedOwners",{observe:"response"}).pipe();
    
   }

   ApproveOwner(){
    return this.http.post(`${this.DB_url}+"/AppsroveOwner"}`,{observe:"response"}).pipe();
   }

   DeclineOwner(){
    return this.http.delete(this.DB_url+"/DeclineOwner",{observe:"response"}).pipe();
   }

}
