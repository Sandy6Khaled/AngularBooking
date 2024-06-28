// import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
// import { image } from '../../Models/Images';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { HotelsService } from '../../Services/hotels.service';
// import { ActivatedRoute } from '@angular/router';
// import { Hotel } from '../../Models/Hotels';

// @Component({
//   selector: 'app-hotel-details',
//   standalone: true,
//   imports: [CommonModule,HttpClientModule],
//   providers:[HotelsService],
//   templateUrl: './hotel-details.component.html',
//   styleUrl: './hotel-details.component.css'
// })
// export class HotelDetailsComponent implements AfterViewInit,OnInit {
//   hotelId: number = 0;
//   hotelDetails:any =
//   {
//     id: 0,
//     name: '',
//     description: '',
//     numberOfStars: 0,
//     address: {
//       city: '',
//       street: '',
//       postalCode: ''
//     },
//     isDeleted: false,
//     ownerId: 1,
//     owner: {
//       id: 1,
//       user: null,
//       offers: [],
//       restaurants: [],
//       isDeleted: false
//     },
//     wishLists: [],
//     reviews: [],
//     offers: [],
//     rooms: [],
//     complains: [],
//     images: []
//   }
//   slides:any[]=[];

//   constructor(private route: ActivatedRoute, private hotelsService: HotelsService){}
//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.hotelId = +params['Id'];  // Retrieve the hotel ID from the URL
//       this.loadHotelDetails(this.hotelId);
//     });
//   }
  
//   ngAfterViewInit(): void {
//     this.initBootstrapCarousel();
//   }

  
//   // private initOwlCarousel() {
//   //   const $ = (window as any).$;
//   //   if ($('.testimonial-carousel').length) {
//   //     $('.testimonial-carousel').owlCarousel('destroy');
//   //     $('.testimonial-carousel').owlCarousel({
//   //       autoplay: true,
//   //       smartSpeed: 1000,
//   //       center: true,
//   //       margin: 24,
//   //       dots: true,
//   //       loop: true,
//   //       nav: false,
//   //       responsive: {
//   //         0: {
//   //           items: 1
//   //         },
//   //         768: {
//   //           items: 2
//   //         },
//   //         992: {
//   //           items: 3
//   //         }
//   //       }
//   //     });
//   //   }
//   // }
//   private initBootstrapCarousel() {
//     // Ensure jQuery is available
//     const $ = (window as any).$;
//     // Initialize the carousel
//     $('#carouselExampleControls').carousel();
//   }
//   onPrevClick(event: Event) {
//     event.preventDefault();
//     // $('#carouselExampleControls').carousel('prev');
//   }

//   onNextClick(event: Event) {
//     event.preventDefault();
//     // $('#carouselExampleControls').carousel('next');
//   }

//   loadHotelDetails(Id: number) {
//     this.hotelsService.getById(Id).subscribe({
//       next: (response) => {
//         this.hotelDetails = response;
//         this.slides = response.images.map((img) => ({
//           image: img.source
//         }));
//         // this.slides=response.images;
//         console.log(this.hotelDetails);
//       },
//       error: (err) => {
//         console.error('Error loading hotel details', err);
//       }
//     });
//   }
// }
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HotelsService } from '../../Services/hotels.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HotelReviewComponent } from '../hotel-review/hotel-review.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule,HotelReviewComponent],
  providers: [HotelsService],
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements AfterViewInit, OnInit {
  hotelId: number = 0;
  hotelDetails: any = {
    id: 0,
    name: '',
    description: '',
    numberOfStars: 0,
    address: {
      city: '',
      street: '',
      postalCode: ''
    },
    isDeleted: false,
    ownerId: 1,
    owner: {
      id: 1,
      user: null,
      offers: [],
      restaurants: [],
      isDeleted: false
    },
    wishLists: [],
    reviews: [],
    offers: [],
    rooms: [],
    complains: [],
    images: []
  };
  slides: any[] = [];
  starArray: any[] = [];
  averageRating: number = 0;
  ratingText: string = '';

  constructor(private route: ActivatedRoute, private hotelsService: HotelsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['Id'];  // Retrieve the hotel ID from the URL
      this.loadHotelDetails(this.hotelId);
    });
  }

  ngAfterViewInit(): void {
    this.initBootstrapCarousel();
  }

  private initBootstrapCarousel() {
    // Ensure jQuery is available
    const $ = (window as any).$;
    // Initialize the carousel
    $('#carouselExampleControls').carousel();
  }

  onPrevClick(event: Event) {
    event.preventDefault();
    const $ = (window as any).$;
    $('#carouselExampleControls').carousel('prev');
  }

  onNextClick(event: Event) {
    event.preventDefault();
    const $ = (window as any).$;
    $('#carouselExampleControls').carousel('next');
  }

  loadHotelDetails(Id: number) {
    this.hotelsService.getById(Id).subscribe({
      next: (response) => {
        this.hotelDetails = response;
        this.slides = response.images.map((img) => ({
          image: img.source
        }));
        this.starArray = Array(this.hotelDetails.numberOfStars).fill(0);
        this.calculateAverageRating();
        console.log(this.hotelDetails);
      },
      error: (err) => {
        console.error('Error loading hotel details', err);
      }
    });
  }

  calculateAverageRating() {
    const totalReviews = this.hotelDetails.reviews.length;
    const totalRating = this.hotelDetails.reviews.reduce((sum:any, review:any) => sum + review.rate, 0);
    this.averageRating = totalRating / totalReviews;
    this.ratingText = this.getRatingText(this.averageRating);
  }

  getRatingText(rating: number): string {
    if (rating >= 8) return 'Very Good';
    if (rating >= 6) return 'Good';
    if (rating >= 4) return 'Fair';
    return 'Poor';
  }
}
