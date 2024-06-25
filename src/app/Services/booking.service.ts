// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class BookingService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../Models/BookingRequest';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:7182/api/Reservation/create-payment-intent';

  constructor(private http: HttpClient) {}

  createPaymentIntent(reservation: Reservation): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservation);
  }
}
