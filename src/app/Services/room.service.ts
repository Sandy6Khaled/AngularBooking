import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../Models/Rooms';
import { AddedRoom } from '../Models/AddRoom';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_url = 'https://localhost:7182/api/Room'
  addRoom(room:AddedRoom){
    return this.http.post(this.DB_url,room,{observe:'response',responseType:'text'});
  }
  getRoomCount(hotelId:number):Observable<any>{
    return this.http.get<number>(`${this.DB_url}/${hotelId}`,{observe:'response'});
  }
  
}
