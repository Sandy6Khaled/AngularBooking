import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../Services/booking.service';
import { Reservation } from '../../Models/Booking';
import { BookingDataService } from '../../Services/booking-data.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
providers:[BookingService,BookingDataService],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit{
  success: any ={
    startDate: "",
  endDate: "",
  numberOfGuests: 0,
  clientId: 0,
  paymentIntentId: "",
  amount: 0,
  roomId: 0,
  state: 0
  };

  constructor(private bookingDataService: BookingDataService,private bookingService:BookingService) {}

  ngOnInit(): void {
    // Retrieve the booking data
    this.success  = this.bookingDataService.getBookingData();
    console.log("reservationobj",this.success);
    if (!this.success) {
      const storedData = localStorage.getItem('reservationData');
      if (storedData) {
        this.success = JSON.parse(storedData);
      }
    }
    console.log('reservationobj', this.success);
  
  if (this.success) {
    this.successeded();
  }
  }
  successeded(){
    this.bookingService.paymentSuccess(this.success).subscribe({
      next: (data) => {
        console.log(data);
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
