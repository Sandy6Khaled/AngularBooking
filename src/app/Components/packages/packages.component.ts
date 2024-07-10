import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../Services/offers.service';
import { Offer } from '../../Models/Offers';
import { HotelsService } from '../../Services/hotels.service';
import { Hotel } from '../../Models/Hotels';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  providers:[OffersService,HotelsService,TokenService],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent implements OnInit{
  offers: Offer[] = [];
  // hotel:any;
  hotels: { [key: number]: Hotel } = {}; // Map of hotelId to Hotel object
  constructor(private offersService: OffersService , private hotelService:HotelsService,private tokenService:TokenService,private router:Router) { }

  ngOnInit(): void {
    this.fetchOffers();
  }

  fetchOffers(): void {
    this.offersService.getOffers().subscribe({
      next: (data) => {
        this.offers = data;
        console.log("Offers",data);
        // this.getHotel(this.offers.hotelId)
        this.offers.forEach(offer => {
          this.getHotel(offer.hotelId);
        });
        
      },
      error: (error) => {
        console.error('Error fetching offers:', error);
      }
    });
  }
  getHotel(id:number){
    this.hotelService.getById(id).subscribe({
      next: (data) => {
        // this.hotel = data
        this.hotels[id] = data;
        console.log("Hotel",data);
        
      },
      error: (error) => {
        console.log("Hotel for Offers",error);
        
      }
    })
  }
  navigateToDetails(hotelId: number) {
    if (this.tokenService.getAccessToken()) {
      this.router.navigate(['/details', hotelId]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
