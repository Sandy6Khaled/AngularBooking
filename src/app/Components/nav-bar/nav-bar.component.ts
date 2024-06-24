import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { NavbarAuthService } from '../../Services/navbar-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, RegisterComponent, LoginComponent,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
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
}
