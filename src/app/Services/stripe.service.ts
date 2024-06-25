// stripe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../Models/Rooms'; // Adjust as per your model

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private stripeApiUrl = 'https://api.stripe.com/v1/checkout/sessions'; // Example Stripe API endpoint

  constructor(private http: HttpClient) {}

  initiatePayment(room: Room): Observable<any> {
    const payload = {
      // Replace with your Stripe API parameters
      price_data: {
        currency: 'usd',
        product_data: {
          id: room.id,
          description: 'Room payment',
        },
        unit_amount: room.price * 100, // Convert to cents
      },
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: 'http://localhost:4200/payment-success', // Replace with your success URL
      cancel_url: 'http://localhost:4200/payment-cancel', // Replace with your cancel URL
    };

    return this.http.post<any>(this.stripeApiUrl, payload);
  }
}
