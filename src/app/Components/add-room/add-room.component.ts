import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomService } from '../../Services/room.service';
import { AddedRoom } from '../../Models/AddRoom';
import { param } from 'jquery';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [RoomService],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css',
})
export class AddRoomComponent implements OnInit {
  room: AddedRoom = {
    roomType: '',
    description: '',
    price: 0,
    numberOfBeds: 0,
    hotelId: 0,
  };
  hotelId: any;
  roomResponse: any;
  roomNum:any;
  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.room.hotelId = +params['Id'];
      // this.hotelId = +params['Id'];
    });
  }
  onSubmit() {
    this.roomService.addRoom(this.room).subscribe({
      next: (data) => {
        this.roomResponse = data.body;
        console.log('Room Response', data.body);
      },
      error: (err) => {
        console.log('Error on Adding Room', err);
      },
    });
  }
  Home() {
    this.router.navigate(['home']);
  }
  
}
