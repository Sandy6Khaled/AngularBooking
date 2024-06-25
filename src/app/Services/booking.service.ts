// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class BookingService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../Models/Booking';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private apiUrl = 'https://localhost:7182/api/Reservations/create-payment-intent';

  constructor(private readonly http: HttpClient,private readonly token:TokenService) {}

  createPaymentIntent(reservation: Reservation): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.getAccessToken()}`  // Replace with your actual token or other headers
    });
    return this.http.post<any>(this.apiUrl, reservation,{headers});
  }

}
