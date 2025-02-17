// // stripe.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Room } from '../Models/Rooms'; // Adjust as per your model

// @Injectable({
//   providedIn: 'root'
// })
// export class StripeService {
//   private stripeApiUrl = 'https://api.stripe.com/v1/checkout/sessions'; // Example Stripe API endpoint
//   private stripePublishableKey = 'pk_test_51PVYiGRw6EgAB7PszXh9ACUnMORpCdn04dPYxpfnxsPPfl3iFV1V4FBich5TW0DCBNSkVdq8gjvUe7M7zbD3H3Fd00tnvTNHy6';
//   private stripeSecretKey = 'sk_test_51PVYiGRw6EgAB7PsyOh9hl5pkcw6Pp7SGcRCnk3r9027slka0DT5xhcE5mPiJfBGilVWkUaOItptoAFz4L5HbtwN00VbQ6VYKM';

//   constructor(private http: HttpClient) {}

//   initiatePayment(room: Room): Observable<any> {
//     const payload = {
//       // Replace with your Stripe API parameters
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           id: room.id,
//           description: 'Room payment',
//         },
//         unit_amount: room.price * 100, // Convert to cents
//       },
//       payment_method_types: ['card'],
//       mode: 'payment',
//       success_url: 'http://localhost:4200/payment-success', // Replace with your success URL
//       cancel_url: 'http://localhost:4200/payment-cancel', // Replace with your cancel URL
//     };
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.stripeSecretKey}`,
//       'Content-Type': 'application/json'
//     });
//     return this.http.post<any>(this.stripeApiUrl, payload,{headers});
//   }
// }




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../Models/Rooms'; // Adjust as per your model
 
@Injectable({
  providedIn: 'root'
})
export class StripeService {
 
  private stripeApiUrl = 'https://api.stripe.com/v1/checkout/sessions'; // Example Stripe API endpoint
  private stripeApiKey = 'your_stripe_secret_key_here'; // Replace with your Stripe Secret Key
 
  constructor(private http: HttpClient) {}
 
  initiatePayment(room: Room): Observable<any> {
    const body = new HttpParams()
      .set('currency', 'usd')
      .set('payment_method_types[]', 'card')
      .set('line_items[0][price_data][currency]', 'usd')
      .set('line_items[0][price_data][product_data][name]', 'Room payment')
      .set('line_items[0][price_data][unit_amount]', (room.price * 100).toFixed(0)) // Convert to cents
      .set('line_items[0][quantity]', '1')
      .set('mode', 'payment')
      .set('success_url', 'http://localhost:4200/payment-success') // Replace with your success URL
      .set('cancel_url', 'http://localhost:4200/payment-cancel'); // Replace with your cancel URL
 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.stripeApiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
 
    return this.http.post<any>(this.stripeApiUrl, body.toString(), { headers });
  }
}