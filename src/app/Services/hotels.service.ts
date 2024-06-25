import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_url = "https://localhost:7182/Hotel"
  getallHotels(){
    return this.http.get(`${this.DB_url}/allHotels`,{observe:"response"});
  }
  getById(id:number){
    return this.http.get(`${this.DB_url}/getHotelById/${id}`,{observe:"response"});
  }
}
