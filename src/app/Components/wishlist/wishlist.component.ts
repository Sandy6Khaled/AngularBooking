import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../Services/wishlist.service';
import{wishList} from '../../Models/wishList'
import { TokenService } from '../../Services/token.service';
import { addedAndDeletedWishList } from '../../Models/addedAndDeletedWishList';


@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  providers:[WishlistService],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  clientId:number=0;
  wishList: any={
    id: 0,
  isDeleted: null,
  clientId: 0,
  hotels: [
    {
      id: 0,
      name: "",
      description: "",
      numberOfStars: 0,
      address: {
        city: "",
        street: "",
        postalCode: ""
      },
      isDeleted: null,
      restaurants: [],
      ownerId: 0,
      owner: {
        id: 0,
        user: null,
        offers: [],
        restaurants: [],
        isDeleted: null
      },
      reviews: [
        {
          id: 0,
          rate: 0,
          comment: "",
          hotelId: 0,
          clientId: 0
        }
      ],
      offers: [],
      rooms: [],
      complains: [],
      images: [
        {
          id: 0,
          source: "",
          isMain: 0,
          hotelID: 0
        }
      ]
    }
  ]

  }


constructor(private wishListService:WishlistService,private tokenService: TokenService){}
  ngOnInit(): void {
    const userId = +this.tokenService.getUserId();
    console.log(userId)
    this.getWishListsByClientId(userId);
  }
  
  getWishListsByClientId(Id:number){

    
    this.wishListService.getbyClientId(Id).subscribe({
      next: (response) => {
        this.wishList = response.body;
        console.log(this.wishList);
      },
      error: (err) => {
        console.error('Error loading wishList', err);
      }
    });
  }


  removeFromWishlist(hotelId: number): void {
    const userId = this.tokenService.getUserId();
    if (userId) {
     // const addedWishList :addedWishList={ hotelId: hotelId,clientId: +userId};
      const removedWishList :addedAndDeletedWishList={ hotelId: hotelId,clientId:2};
    this.wishListService.removeFromWishList(removedWishList).subscribe({
      next: (response) => {
        console.log('Hotel removed from wishlist', response);
       // this.getWishListsByClientId(this.clientId); // Refresh the wishlist
      },
      error: (err) => {
        console.error('Error removing hotel from wishlist', err);
      }
    });
  }

}
} 
