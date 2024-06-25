import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HotelsService } from '../../Services/hotels.service';
import { Hotel } from '../../Models/Hotels';
import { TrendinHotelsService } from '../../Services/trendin-hotels.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-popular-destination',
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterModule],
  providers: [TrendinHotelsService],
  templateUrl: './popular-destination.component.html',
  styleUrl: './popular-destination.component.css',
})
export class PopularDestinationComponent implements OnInit {
  hotels: any;
  // @Output() HotelId: EventEmitter<number> = new EventEmitter<number>();
  constructor(public hotelsService: TrendinHotelsService) {}
  ngOnInit(): void {
    this.gettrendingHotels();
  }
  gettrendingHotels() {
    this.hotelsService.trendingHotels().subscribe({
      next: (res) => {
        this.hotels = res;
        console.log(res);
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }
  // sendingId(id: number){
  //   this.HotelId.emit(id);
  // }
}
