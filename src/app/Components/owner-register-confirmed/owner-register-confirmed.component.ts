import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-owner-register-confirmed',
  standalone: true,
  imports: [HomeComponent,RouterModule],
  templateUrl: './owner-register-confirmed.component.html',
  styleUrl: './owner-register-confirmed.component.css'
})
export class OwnerRegisterConfirmedComponent {

}
