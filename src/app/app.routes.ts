import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { HotelDetailsComponent } from './Components/hotel-details/hotel-details.component';
import { BookingComponent } from './Components/booking/booking.component';
import { PaymentSuccessComponent } from './Components/payment-success/payment-success.component';
import { PaymentCancelComponent } from './Components/payment-cancel/payment-cancel.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { AddHotelFormComponent } from './Components/add-hotel-form/add-hotel-form.component';
import { ConfirmEmailComponent } from './Components/confirm-email/confirm-email.component';
import { AddRoomComponent } from './Components/add-room/add-room.component';
import { AddOfferComponent } from './Components/add-offer/add-offer.component';
import { OwnerRegisterComponent } from './Components/owner-register/owner-register.component';
import { OwnerRegisterConfirmedComponent } from './Components/owner-register-confirmed/owner-register-confirmed.component';
import { SendResetPasswordFormComponent } from './Components/send-reset-password-form/send-reset-password-form.component';
import { ResetPasswordCodeFormComponent } from './Components/reset-password-code-form/reset-password-code-form.component';
import { NewResetPasswordFormComponent } from './Components/new-reset-password-form/new-reset-password-form.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { PackagesComponent } from './Components/packages/packages.component';
import { PackageHomeComponent } from './Components/package-home/package-home.component';

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
  { path: 'wishlist', component: WishlistComponent },
  { path: 'addhotel', component: AddHotelFormComponent },
  { path: 'emailconfirmation', component: ConfirmEmailComponent },
  { path: 'addroom/:Id', component: AddRoomComponent },
  { path: 'addoffer/:Id', component: AddOfferComponent },
  { path: 'registerowner', component: OwnerRegisterComponent },
  { path: 'registrationconfirmed', component: OwnerRegisterConfirmedComponent },
  { path: 'sendreset', component: SendResetPasswordFormComponent },
  { path: 'resetcode', component: ResetPasswordCodeFormComponent },
  { path: 'resetpassword', component: NewResetPasswordFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'updateprofile', component: UpdateProfileComponent },
  { path: 'packages', component: PackageHomeComponent },
];
