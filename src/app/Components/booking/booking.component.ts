import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../Services/booking.service';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AuthInterceptor } from '../../Interceptors/AuthInterceptor';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [BookingService],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  reservation: any = {
    startDate: '',
    endDate: '',
    numberOfGuests: 5,
    clientId: 1,
    paymentIntentId: '',
    amount: 0,
    roomIds: [],
    state: 0,
  };
  errorMessage: string = '';
  roomId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private reservationService: BookingService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Get the id and price from the URL and assign them to reservation fields
    this.route.paramMap.subscribe((params) => {
      const id = params.get('Id');
      const price = params.get('price');
      console.log(id);
      console.log(price);

      if (id) {
        this.reservation.roomIds[0] = +id;
        this.roomId = +id; // Convert id to a number
      }
      if (price) {
        this.reservation.amount = +price; // Convert price to a number
      }
    });
    console.log(this.roomId);
    console.log(this.reservation.roomIds[0]);
  }

  onSubmit(): void {
    
    this.reservationService.createPaymentIntent(this.reservation).subscribe({
      next: (response) => {
        console.log(response);
        
        // if (response === 'Registration succeeded') {
        //   this.router.navigate(['/login']);
        // } else {
        //   this.errorMessage = 'Email already exists';
        // }
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred. Please try again later.';
      },
    });
  }

  // isFormValid(): boolean {
  //   return (
  //     this.reservation.startDate !== '' &&
  //     this.reservation.endDate !== '' &&
  //     this.reservation.amount !== 0 &&  // Assuming paymentIntentId is no longer required
  //     this.reservation.roomIds[0] !== 0
  //   );
  // }
}
