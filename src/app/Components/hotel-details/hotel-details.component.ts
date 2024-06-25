import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { image } from '../../Models/Images';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HotelsService } from '../../Services/hotels.service';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../../Models/Hotels';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[HotelsService],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css'
})
export class HotelDetailsComponent implements AfterViewInit,OnInit {
  hotelId: number = 0;
  hotelDetails:Hotel | undefined;
  constructor(private route: ActivatedRoute, private hotelsService: HotelsService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['Id'];  // Retrieve the hotel ID from the URL
      this.loadHotelDetails(this.hotelId);
    });
  }
  slides = [
    { image: 'assets/img/testimonial-1.jpg', name: 'John Doe', location: 'New York, USA', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' },
    { image: 'assets/img/testimonial-2.jpg', name: 'John Doe', location: 'New York, USA', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' },
    { image: 'assets/img/testimonial-3.jpg', name: 'John Doe', location: 'New York, USA', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' },
    { image: 'assets/img/testimonial-4.jpg', name: 'John Doe', location: 'New York, USA', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' }
  ];
  ngAfterViewInit(): void {
    this.initOwlCarousel()
  }
  private initOwlCarousel() {
    // Ensure jQuery is available
    const $ = (window as any).$;
    $('.testimonial-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      center: true,
      margin: 24,
      dots: true,
      loop: true,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        992: {
          items: 3
        }
      }
    });
  }
  loadHotelDetails(Id: number) {
    this.hotelsService.getById(Id).subscribe({
      next: (response) => {
        this.hotelDetails = response;
        console.log(this.hotelDetails);
      },
      error: (err) => {
        console.error('Error loading hotel details', err);
      }
    });
  }
}
