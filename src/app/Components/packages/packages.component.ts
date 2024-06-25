import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../Services/offers.service';
import { Offer } from '../../Models/Offers';
import { HotelsService } from '../../Services/hotels.service';
import { Hotel } from '../../Models/Hotels';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[OffersService,HotelsService],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent implements OnInit{
  offers: Offer[] = [];
  hotel:any;
  constructor(private offersService: OffersService , private hotelService:HotelsService) { }

  ngOnInit(): void {
    this.fetchOffers();
  }

  fetchOffers(): void {
    this.offersService.getOffers().subscribe({
      next: (data) => {
        this.offers = data;
        console.log(data);
        
      },
      error: (error) => {
        console.error('Error fetching offers:', error);
      }
    });
  }
  getHotel(id:number){
    this.hotelService.getById(id).subscribe({
      next: (data) => {
        this.hotel = data.body
        console.log(data.body);
        
      },
      error: (error) => {}
    })
  }
}
