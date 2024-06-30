import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { NavbarAuthService } from '../../Services/navbar-auth.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../Services/wishlist.service';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, RegisterComponent, LoginComponent,CommonModule],
  providers:[WishlistService,TokenService],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  @Output() userId:EventEmitter<number>=new EventEmitter<number>();
  constructor(public myService: NavbarAuthService,public router:Router) {}
  isLoggedIn(): boolean {
    return this.myService.isLoggedIn();
  }

  getUserName(): string {
    return this.myService.getUserName();
  }
  LogoutAndRedirect(){
    this.myService.Logout();
    this.router.navigate(['home']);
  }
  getUserRole(){
    return this.myService.getUserRole();
  }
  // toggleWishlist() {
  //   console.log("WishList Toggled");
    
  //   // this.wishlistService.toggleWishlist();
  // }
}
