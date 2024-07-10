import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../Services/owner.service';
import { TokenService } from '../../Services/token.service';
import { Hotel } from '../../Models/Hotels';
import { RouterModule } from '@angular/router';
import { RoomService } from '../../Services/room.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [OwnerService, TokenService, RoomService],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css',
})
export class AddHotelComponent implements OnInit {
  hotels: Hotel[] = [];
  userId: number = 0;
  // roomNum: any;
  roomCounts: { [hotelId: number]: number } = {};
  NoHotelMessage:any;
  // roomCounts: { [hotelId: number]: Observable<number> } = {};
  constructor(
    private readonly ownerService: OwnerService,
    private readonly token: TokenService,
    private readonly roomService: RoomService
  ) {}
  ngOnInit(): void {
    this.getHotelsForOwner();
    this.hotels.forEach((hotel) => {
      // this.roomCounts[hotel.id] = this.getNumberofRooms(hotel.id);
    });
  }

  getHotelsForOwner() {
    this.userId = +this.token.getUserId();
    this.ownerService.getHotelsByOwnerId(this.userId).subscribe({
      next: (res) => {
        if(res.body.length > 0){
          this.hotels = res.body;
          console.log('Hotels for Owner', res);
          this.hotels.forEach((h) => {
            this.getNumberofRooms(h.id);
          });
        }else{
          this.NoHotelMessage = "You don't have any hotels yet, please add one";
        }
        
      },
      error: (err) => {
        console.log('Error in Getting Hotels for Owner In Add Hotel', err);
      },
    });
  }
  getNumberofRooms(hotelId: number) {
    this.roomService.getRoomCount(hotelId).subscribe({
      next: (data) => {
        // this.roomNum = data.body;
        this.roomCounts[hotelId] = data.body;
        console.log('Room Count', this.roomCounts);
      },
      error: (err) => {
        console.log('Error on getting Room Number', err);
      },
    });
  }
}
