import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WishlistService } from '../../Services/wishlist.service';
import { wishList } from '../../Models/wishList';
import { TokenService } from '../../Services/token.service';
import { addedAndDeletedWishList } from '../../Models/addedAndDeletedWishList';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [WishlistService],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  clientId: number = 0;
  removedWishList: any = {
    hotelId: 0,
    userId: 0,
  };
  wishList: any = {
    id: 0,
    isDeleted: null,
    clientId: 0,
    hotels: [],
  };
  errorMessage: string = '';
  constructor(
    private wishListService: WishlistService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = +this.tokenService.getUserId();
    console.log(userId);
    this.getWishListsByUserId(userId);
  }

  getWishListsByUserId(Id: number) {
    this.wishListService.getbyUserId(Id).subscribe({
      next: (response) => {
        this.wishList = response.body;
        console.log(this.wishList);
        if(this.wishList.hotels.length == 0){
          this.errorMessage = "OOPS!!! There is No Wish List for you now,Try again after adding"

        }
      },
      error: (err) => {
        console.error('Error loading wishList', err);
      },
    });
  }

  removeFromWishlist(hotelId: number): void {
    const userId = this.tokenService.getUserId();
    if (userId) {
      this.removedWishList.userId = +this.tokenService.getUserId();
      this.removedWishList.hotelId = hotelId;
      this.wishListService.removeFromWishList(this.removedWishList).subscribe({
        next: (response) => {
          console.log('Hotel removed from wishlist', response);
          // this.getWishListsByClientId(this.clientId); // Refresh the wishlist
          this.wishList.hotels = this.wishList.hotels.filter(
            (hotel: any) => hotel.id !== hotelId
          );
        if(this.wishList.hotels.length == 0){
          this.errorMessage = "OOPS!!! There is No Wish List for you now,Try again after adding";
        }
          
          console.log('Updated wishlist:', this.wishList.hotels);
          // this.router.navigate(['../wishlist']);
        },
        error: (err) => {
          console.error('Error removing hotel from wishlist', err);
        },
      });
    }
  }
}
