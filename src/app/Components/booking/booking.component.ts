import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../Services/booking.service';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StripeService } from '../../Services/stripe.service';
import { Room } from '../../Models/Rooms';
import { PaymentSuccessComponent } from '../payment-success/payment-success.component';
import { PaymentCancelComponent } from '../payment-cancel/payment-cancel.component';
import { Payment } from '../../Models/payment';
import { TokenService } from '../../Services/token.service';
import { Reservation } from '../../Models/Booking';
import { BookingDataService } from '../../Services/booking-data.service';
// import { AuthInterceptor } from '../../Interceptors/AuthInterceptor';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentSuccessComponent,
    PaymentCancelComponent,
  ],
  providers: [BookingService, StripeService,TokenService,BookingDataService],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  reservation: Reservation = {
    startDate: '',
    endDate: '',
    numberOfGuests: 5,
    clientId: 0,
    paymentIntentId: null,
    amount: 0,
    roomId: 0,
    state: 3,
  };
  errorMessage: string = '';
  roomId: number = 0;
  room: Room = { id: 0, price: 0 };
  paymentobj: Payment = {
    userId: 0,
    roomId: 0,
    successUrl: 'http://localhost:4200/payment-success',
    cancelUrl: 'http://localhost:4200/payment-cancel',
    amount: 0,
  };
  // {
  //   userId: number;
  //   roomId: number;
  //   successUrl: string;
  //   cancelUrl: string;
  //   amount: number;
  // }
  // @Output() bookingData: EventEmitter<any>=new EventEmitter();
  constructor(
    private route: ActivatedRoute,
    private reservationService: BookingService,
    private router: Router,
    private stripeService: StripeService,
    private tokenService: TokenService,
    private bookingDataService: BookingDataService
  ) {}

  ngOnInit(): void {
    // Get the id and price from the URL and assign them to reservation fields
    this.route.paramMap.subscribe((params) => {
      const id = params.get('Id');
      const price = params.get('price');
      console.log(id);
      console.log(price);
      this.paymentobj.userId = +this.tokenService.getUserId();
      this.reservation.clientId = +this.tokenService.getUserId();
      if (id) {
        this.reservation.roomId = +id;
        this.roomId = +id; // Convert id to a number
        this.room.id = +id;
        this.paymentobj.roomId= +id;
      }
      if (price) {
        this.reservation.amount = +price; // Convert price to a number
        this.room.price = +price;
        this.paymentobj.amount = +price;
      }

    });

    console.log(this.roomId);
    console.log("Reservation",this.reservation);
  }

  onSubmit(): void {
    // this.reservationService.createPaymentIntent(this.reservation).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     // this.initiatePayment(this.room);
    //     // if (response === 'Registration succeeded') {
    //     //   this.router.navigate(['/login']);
    //     // } else {
    //     //   this.errorMessage = 'Email already exists';
    //     // }
    //     // this.checkoutSession(this.paymentobj);
    //   },
    //   error: (error) => {
    //     console.error('Error:', error);
    //     this.errorMessage = 'An error occurred. Please try again later.';
    //   },
    // });

    this.reservationService.createCheckoutSession(this.paymentobj).subscribe({
      next: (session) => {
        console.log('session', session.text);
        this.bookingDataService.setBookingData(this.reservation);
        localStorage.setItem('reservationData', JSON.stringify(this.reservation));
        console.log(this.bookingDataService);
        window.location.assign(session.text);
        // window.open(session.text,'_blank');
        // this.bookingData.emit(this.reservation)
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  // initiatePayment(room: Room): void {
  //   // Assuming you pass room details to StripeService
  //   this.stripeService.initiatePayment(room).subscribe(
  //     (session) => {
  //       // Redirect to Stripe checkout page
  //       window.location.href = session.url;
  //     },
  //     (error) => {
  //       console.error('Failed to initiate payment:', error);
  //       // Handle error
  //     }
  //   );
  // }
  // checkoutSession(paymentpram:Payment){
  //   this.reservationService.createCheckoutSession(paymentpram).subscribe({
  //     next: (session) => {
  //       console.log("session",session);

  //       window.location.href = session.url;
  //     },
  //     error: (error) => {}
  //   });
}

// isFormValid(): boolean {
//   return (
//     this.reservation.startDate !== '' &&
//     this.reservation.endDate !== '' &&
//     this.reservation.amount !== 0 &&  // Assuming paymentIntentId is no longer required
//     this.reservation.roomIds[0] !== 0
//   );
// }
