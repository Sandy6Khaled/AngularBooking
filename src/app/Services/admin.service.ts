import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http:HttpClient) { }
   private readonly DB_url = "https://localhost:7182/api/Admin";

   GetUnVerifiedOwners(){
    return this.http.get(`${this.DB_url}/GetUnVerifiedOwners`,{observe:"response"}).pipe();
   }

   ApproveOwner(ownerId:number){
    return this.http.post(`${this.DB_url}/ApproveOwner`,{observe:"response",params: { id: ownerId.toString() }}).pipe();
   }

   DeclineOwner(ownerId:number){
    return this.http.delete(this.DB_url+"/DeclineOwner",{observe:"response",params: { id: ownerId.toString() },responseType:'text'});
   }

}
