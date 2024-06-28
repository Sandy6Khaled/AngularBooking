import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../../Services/hotels.service';
import { RouterModule ,Router} from '@angular/router';
import { TokenService } from '../../Services/token.service';
import { WishlistService } from '../../Services/wishlist.service';
import {addedAndDeletedWishList} from '../../Models/addedAndDeletedWishList'


@Component({
  selector: 'app-package-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [HotelsService,TokenService,WishlistService],
  templateUrl: './package-home.component.html',
  styleUrl: './package-home.component.css',
})
export class PackageHomeComponent implements OnInit {
  results: any;
  errorMessage:string='';
  constructor(public HotelService: HotelsService,public tokenService:TokenService,public wishlistService:WishlistService, private router: Router) {}
  ngOnInit(): void {
    this.getall();
  }
  getall() {
    this.HotelService.getallHotels().subscribe({
      next: (data) => {
        this.results = data.body;
        console.log(this.results);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  addToWishlist(hotelId: number): void {
    const userId = +this.tokenService.getUserId();
    if (userId) {
    const addedWishList :addedAndDeletedWishList={ hotelId: hotelId,clientId: userId};
    console.log(userId)
    //const addedWishList :addedAndDeletedWishList={ hotelId: hotelId,clientId:2};

      this.wishlistService.addToWishList(addedWishList).subscribe({
        next: (response) => {
          if(response.body=="Insertion succeeded.")
            {
          console.log('Hotel added to wishlist', response);
          
          this.router.navigate(['/wishlist']); // Redirect to wishlist
            }
          else if(response.body=="Hotel already exists in the wishlist.")
            {
            console.log("Hotel already exists in the wishlist.");
            this.errorMessage="Hotel already exists in the wishlist.";
            }

           
        },
        error: (err) => {
          console.error('Error adding hotel to wishlist', err);
          this.errorMessage="Error adding hotel to wishlist";
        },
      });
    } else {
      console.error('User ID not found in token');
    }
  }
}
