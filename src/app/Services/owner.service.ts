import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../Models/Hotels';
import { Observable } from 'rxjs';
import { addedHotel } from '../Models/AddHotel';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_url = 'https://localhost:7182/api/Owner';
  getHotelsByOwnerId(ownerId:number):Observable<any>{
    return this.http.get<any>(`${this.DB_url}/${ownerId}/hotels`,{observe:'response'}).pipe()
  }
  addNewHotel(hotel:FormData):Observable<any>{
    return this.http.post(`${this.DB_url}`,hotel,{observe:'response',responseType:'text'}).pipe()
  }
}
