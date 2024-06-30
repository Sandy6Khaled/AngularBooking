import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_url = 'https://localhost:7182/api/ClientProfile';
  GetClientData(userId:number):Observable<any>{
    return this.http.get(`${this.DB_url}/GetClientData/`,{observe:'response',
      params: { userId: userId.toString() }});
  }
  UpdateProfile(updatedProfile:FormData){
    return this.http.put(`${this.DB_url}/UpdateProfile`,updatedProfile,{observe:'response',responseType:'text'});
  }
  DeleteProfile(userId:number){
    return this.http.delete(`${this.DB_url}/DeleteProfile/${userId}`,{observe:'response'});
  }
}
