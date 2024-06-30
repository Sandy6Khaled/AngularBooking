import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../Services/offers.service';
import { Offer } from '../../Models/Offers';
import { HotelsService } from '../../Services/hotels.service';
import { Hotel } from '../../Models/Hotels';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  providers:[OffersService,HotelsService],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent implements OnInit{
  offers: Offer[] = [];
  // hotel:any;
  hotels: { [key: number]: Hotel } = {}; // Map of hotelId to Hotel object
  constructor(private offersService: OffersService , private hotelService:HotelsService) { }

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
}
