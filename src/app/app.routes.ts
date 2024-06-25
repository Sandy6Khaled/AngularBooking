import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { HotelDetailsComponent } from './Components/hotel-details/hotel-details.component';
import { BookingComponent } from './Components/booking/booking.component';
import { PaymentSuccessComponent } from './Components/payment-success/payment-success.component';
import { PaymentCancelComponent } from './Components/payment-cancel/payment-cancel.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'details/:Id', component: HotelDetailsComponent },
  { path: 'book/:Id/:price', component: BookingComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-cancel', component: PaymentCancelComponent },
];
