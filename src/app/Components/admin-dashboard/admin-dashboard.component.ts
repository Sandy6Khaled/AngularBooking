import { Component } from '@angular/core';
import { VerificationComponent } from '../verification/verification.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [VerificationComponent],
  providers:[],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
