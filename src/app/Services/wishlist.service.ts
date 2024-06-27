import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private readonly http:HttpClient){}
  private readonly DB_url="https://localhost:7182/api/WishList";
  getbyClientId(clientId:number){
    return this.http.get(`${this.DB_url}/${clientId}`,{observe:"response"}).pipe();
  }
}
