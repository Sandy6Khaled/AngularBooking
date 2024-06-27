import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from '../Models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingDataService {

  private bookingDataSubject = new BehaviorSubject<any>(null);
  bookingData$ = this.bookingDataSubject.asObservable();

  setBookingData(data: Reservation): void {
    this.bookingDataSubject.next(data);
  }

  getBookingData(): Reservation  {
    return this.bookingDataSubject.value;
  }
}
