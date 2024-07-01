import { Component } from '@angular/core';
import { verfication } from '../../Models/Verfication';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent {
  verification: verfication = {
    id: 0,
    userId: 0,
    name: '',
    email: '',
    certificate: null,
    phoneNumber: 0
};
}
