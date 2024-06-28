import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../Models/Offers';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_url="https://localhost:7182/api/Offer";
  getOffers(): Observable<any>{
    return this.http.get<any>(this.DB_url);
  }
}
