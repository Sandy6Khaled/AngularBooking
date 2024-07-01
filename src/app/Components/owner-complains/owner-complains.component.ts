import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ComplainsService } from '../../Services/complains.service';
import { getComplain } from '../../Models/Complains';

@Component({
  selector: 'app-owner-complains',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[ComplainsService],
  templateUrl: './owner-complains.component.html',
  styleUrl: './owner-complains.component.css'
})
export class OwnerComplainsComponent implements OnInit {
  @Input() ComplainsHotelId!:number;
  // @Input() OwnerId!:number;
  complains:getComplain[]=[];
  // {
  //   id: 0,
  //   discription: '',
  //   isSolved: false,
  //   isDeleted: false,
  //   date: '',
  //   hotelId: 0,
  //   hotel: null,
  //   owner: null,
  //   ownerId: null,
  //   client: null,
  //   clientId: 0
  // }
  constructor(private readonly complainService:ComplainsService){}
  ngOnInit(): void {
    console.log("HotelId From Complains",this.ComplainsHotelId);
    
    this.getComplains()
  }
getComplains(){
  this.complainService.GetAllComplainsByHotelId(this.ComplainsHotelId).subscribe({
    next: (data) => {
      this.complains=data;
      console.log("Owner complains",data);
      
    },
    error: (err) => {
      console.log("Owner Complains Error",err);
    }
  })
}
}
