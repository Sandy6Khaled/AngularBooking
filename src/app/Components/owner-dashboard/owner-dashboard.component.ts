import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';
import { OwnerService } from '../../Services/owner.service';
import { TokenService } from '../../Services/token.service';
import { OwnerComplainsComponent } from '../owner-complains/owner-complains.component';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AddHotelComponent,OwnerComplainsComponent],
  providers: [OwnerService,TokenService],
  templateUrl: './owner-dashboard.component.html',
  styleUrl: './owner-dashboard.component.css',
})
export class OwnerDashboardComponent {
  
}
