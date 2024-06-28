import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ReviewsService } from '../../Services/reviews.service';
import { Review } from '../../Models/Reviews';
import { addedReview } from '../../Models/AddReview';
import { TokenService } from '../../Services/token.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-review',
  standalone: true,
  imports: [CommonModule, HttpClientModule,ReactiveFormsModule,FormsModule],
  providers: [ReviewsService,TokenService],
  templateUrl: './hotel-review.component.html',
  styleUrl: './hotel-review.component.css',
})
export class HotelReviewComponent implements OnInit {
  @Input() hotelId!: number;
  @Input() hotelName!: string;
  reviews: any;
  resultMessage:string='';
  newReview: addedReview = {
    commentText: '',
    rate: 0,
    userId: 0,
    hotelId: 0,
  };
  client:any = {
    id: 0,
    name: ''
  };
  hotel:any ={
    id: 0,
    name: ''
  };
  constructor(private readonly reviewService: ReviewsService,private readonly tokenService:TokenService) {}
  ngOnInit(): void {
    this.getAllReviews();
  }
  getAllReviews() {
    this.reviewService.getReviews().subscribe({
      next: (response) => {
        this.reviews = response;
        console.log('reviews', this.reviews);
        
      },
      error: (err) => {
        console.log('Error Reviews', err);
      },
    });
  }
  getWholeStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }

  submitReview(){
    this.newReview.userId = +this.tokenService.getUserId();
    this.newReview.hotelId = this.hotelId;
    this.client.id = +this.tokenService.getUserId();
    this.client.name = this.tokenService.getUserName();
    this.hotel.id = this.hotelId;
    this.hotel.name = this.hotelName;
    this.reviewService.addReview(this.newReview.userId,this.hotelId,this.newReview).subscribe({
      next: (response) => {
        this.resultMessage = response.body;
        console.log(this.resultMessage);
         // Add the new review to the reviews array
         const addedUserReview: Review = {
          id: response.id, // Assuming the response contains the new review's ID
          rate: this.newReview.rate,
          comment: this.newReview.commentText,
          hotelId: this.hotelId,
          hotel: {
            id: this.hotelId,
            name: this.hotelName, // Or fetch the actual hotel name if available
          },
          client: {
            id: this.client.id,
            name: this.client.name,
          },
        };
        this.reviews.push(addedUserReview);
        // Clear the form fields
        this.newReview.commentText = '';
        this.newReview.rate = 0;

        // Optionally hide the result message after a few seconds
        setTimeout(() => this.resultMessage = '', 5000);
      },
      error: (err) => {
        console.log('Error Added Reviews', err);
      }
    })
  }
}
