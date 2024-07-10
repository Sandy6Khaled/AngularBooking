import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HotelsService } from '../../Services/hotels.service';
import { Hotel } from '../../Models/Hotels';
import { TrendinHotelsService } from '../../Services/trendin-hotels.service';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../Services/token.service';
import { NavbarAuthService } from '../../Services/navbar-auth.service';

@Component({
  selector: 'app-popular-destination',
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterModule],
  providers: [TrendinHotelsService,TokenService],
  templateUrl: './popular-destination.component.html',
  styleUrl: './popular-destination.component.css',
})
export class PopularDestinationComponent implements OnInit {
  hotels: any;
  // @Output() HotelId: EventEmitter<number> = new EventEmitter<number>();
  constructor(public hotelsService: TrendinHotelsService,private tokenService:TokenService,private router:Router) {}
  ngOnInit(): void {
    this.gettrendingHotels();
  }
  gettrendingHotels() {
    this.hotelsService.trendingHotels().subscribe({
      next: (res) => {
        this.hotels = res;
        console.log("TrendingHotels",res);
      },
      error: (err) => {
        console.log('Error in TrendingHotels', err);
      },
    });
  }
  navigateToDetails(hotelId: number) {
    if (this.tokenService.getAccessToken()) {
      this.router.navigate(['/details', hotelId]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
