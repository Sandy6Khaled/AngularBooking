import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComplainsService } from '../../Services/complains.service';

@Component({
  selector: 'app-owner-complains',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[ComplainsService],
  templateUrl: './owner-complains.component.html',
  styleUrl: './owner-complains.component.css'
})
export class OwnerComplainsComponent {

  constructor(private readonly complainService:ComplainsService){}
}
