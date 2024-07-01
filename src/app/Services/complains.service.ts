import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Complain } from '../Models/Complains';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComplainsService {
  constructor(
    private readonly http: HttpClient,
    private readonly token: TokenService
  ) {}
  private readonly DB_url = 'https://localhost:7182/api/Complains';
  createComplain(NewComplain: Complain): Observable<HttpResponse<string>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.getAccessToken()}`, // Replace with your actual token or other headers
    });
    return this.http.post<string>(`${this.DB_url}/create`, NewComplain, {
      headers,observe:'response',responseType:'text' as 'json'
    }).pipe();
  }
  GetAllComplainsByHotelId(hotelId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.getAccessToken()}`, // Replace with your actual token
    });
    return this.http.get<any>(`${this.DB_url}/hotel/${hotelId}`, { headers });
  }
  GetAllUserComplains(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token.getAccessToken()}`, // Replace with your actual token
    });
    return this.http.get<any>(`${this.DB_url}/user/${userId}`, { headers });
  }
}
