import { AfterViewInit, Component } from '@angular/core';
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
  slides: any;

  constructor(private readonly reviewService: ReviewsService) {}

  ngAfterViewInit() {
    this.getallReviews();
  }

  getallReviews() {
    this.reviewService.getReviews().subscribe({
      next: (data) => {
        this.slides = data;
        console.log('Reviews', data);
        this.initOwlCarousel(); // Initialize Owl Carousel after data is loaded
      },
      error: (err) => {
        console.log("Testimonial Error",err);
      },
    });
  }

  private initOwlCarousel() {
    // Ensure jQuery is available
    const $ = (window as any).$;
    if ($ && $.fn.owlCarousel) {
      setTimeout(() => {
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
      }, 100); // Adjust the delay if necessary
    } else {
      console.error('jQuery or OwlCarousel not loaded');
    }
  }
  
}

