import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent implements AfterViewInit{
  ngAfterViewInit() {
    this.initOwlCarousel();
  }

  private initOwlCarousel() {
    // Ensure jQuery is available
    const $ = (window as any).$;
    $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      center: true,
      margin: 24,
      dots: true,
      loop: true,
      nav : false,
      responsive: {
          0:{
              items:1
          },
          768:{
              items:2
          },
          992:{
              items:3
          }
      }
  });
  }
}
