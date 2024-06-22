import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterModule,
    RegisterComponent,
    LoginComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
