// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-booking',
//   standalone: true,
//   imports: [],
//   templateUrl: './booking.component.html',
//   styleUrl: './booking.component.css'
// })
// export class BookingComponent {

// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../Services/booking.service';
import { Reservation } from '../../Models/BookingRequest';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
 styleUrl: './booking.component.css',
 standalone:true,
 imports:[FormsModule,HttpClientModule,ReactiveFormsModule,FormsModule,RouterModule,CommonModule]

})
export class BookingComponent {
  reservation: Reservation = {
    startDate: '',
    endDate: '',
    numberOfGuests: 5,
    clientId: 9,
    paymentIntentId: '',
    amount: 0,
    roomIds: [0],
    state: 0
  };
  errorMessage: string = '';

  constructor(private reservationService: BookingService, private router: Router) {}

  onSubmit(): void {
    if (this.isFormValid()) {
      this.reservationService.createPaymentIntent(this.reservation).subscribe({
        next: (response) => {
          if (response === "Registration succeeded") {
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = 'Email already exists';
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      });
    }
  }

  isFormValid(): boolean {
    return this.reservation.startDate !== '' &&
           this.reservation.endDate !== '' &&
           this.reservation.paymentIntentId !== '';
  }
}
