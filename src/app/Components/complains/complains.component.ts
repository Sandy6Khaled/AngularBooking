import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplainsService } from '../../Services/complains.service';
import { Complain } from '../../Models/Complains';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-complains',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [ComplainsService,TokenService],
  templateUrl: './complains.component.html',
  styleUrl: './complains.component.css',
})
export class ComplainsComponent {
  @Input() hotelId!:number;
  @Input() OwnerId!:number;
  newComplain: Complain = {
    description: '',
    hotelId: 0,
    ownerId: 0,
    clientId: 0,
    date: null,
  };
  resultMessage:string|null ="";
  showForm: boolean = true;
  constructor(private readonly complainService: ComplainsService,private readonly token:TokenService) {}
  submitComplain() {
    this.newComplain.clientId = +this.token.getUserId();
    // this.newComplain.date = null;
    this.newComplain.hotelId = this.hotelId;
    this.newComplain.ownerId = this.OwnerId;
    this.complainService.createComplain(this.newComplain).subscribe({
      next: (data) => {
        this.resultMessage = data.body;
        console.log(this.resultMessage);
        this.showForm = false; // Hide the form after successful submission
      },
      error: (err) => {
        console.log("Error Complain",err);
      }
    })
  }
}
