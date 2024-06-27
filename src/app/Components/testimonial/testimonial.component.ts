import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsService } from '../../Services/reviews.service';
import { Review } from '../../Models/Reviews';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule], // Import CommonModule here
  providers: [ReviewsService],
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements AfterViewInit {
  // { image: 'assets/img/testimonial-1.jpg', name: 'John Doe', location: 'New York, USA', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' },
  // { image: 'assets/img/testimonial-2.jpg', name: 'John Doe', location: 'New York, USA', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' },
  // { image: 'assets/img/testimonial-3.jpg', name: 'John Doe', location: 'New York, USA', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' },
  // { image: 'assets/img/testimonial-4.jpg', name: 'John Doe', location: 'New York, USA', text: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.' }
  slides: any;
  constructor(private readonly reviewService: ReviewsService) {}
  // ngOnInit(): void {
  //   this.getallReviews();
  // }
  ngAfterViewInit() {
    this.getallReviews();
    this.initOwlCarousel();
    
  }
  getallReviews() {
    this.reviewService.getReviews().subscribe({
      next: (data) => {
        this.slides = data;
        console.log('Reviews', data);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
      },
    });
  }
}
