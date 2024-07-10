import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../Models/Hotels';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_url = "https://localhost:7182/api/Hotel"
  getallHotels():Observable<any>{
    return this.http.get<Hotel[]>(`${this.DB_url}/allHotels`,{observe:"response"});
  }
  getById(Id:number): Observable<Hotel>{
    return this.http.get<Hotel>(`${this.DB_url}/${Id}`).pipe();
  }
  getTrendingHotels(): Observable<any>{
    return this.http.get<Hotel[]>(`${this.DB_url}/trendingHotels`,{observe:"response",responseType:'json'}).pipe();
  }
}
