import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../../Services/hotels.service';
import { RouterModule, Router } from '@angular/router';
import { TokenService } from '../../Services/token.service';
import { WishlistService } from '../../Services/wishlist.service';
import { addedAndDeletedWishList } from '../../Models/addedAndDeletedWishList';
import { RoomService } from '../../Services/room.service';
import { forkJoin, map } from 'rxjs';
import { Hotel } from '../../Models/Hotels';

@Component({
  selector: 'app-package-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [HotelsService, TokenService, WishlistService, RoomService],
  templateUrl: './package-home.component.html',
  styleUrl: './package-home.component.css',
})
export class PackageHomeComponent implements OnInit {
  // results: any;
  errorMessage: string = '';
  addedWishList: any = {
    hotelId: 0,
    userId: 0,
  };
  results: Hotel[] = [];
  roomCounts: { [hotelId: number]: number } = {};

  constructor(
    public HotelService: HotelsService,
    public tokenService: TokenService,
    public wishlistService: WishlistService,
    private router: Router,
    private roomService: RoomService
  ) {}
  ngOnInit(): void {
    this.getHotelsWithRooms();
  }
  getall() {
    this.HotelService.getallHotels().subscribe({
      next: (data) => {
        this.results = data.body;
        console.log('Hotels Result without filtering', this.results);

        // Get room counts for each hotel
        this.results.forEach((hotel: any) => {
          this.getNumberofRooms(hotel.id);
        });
      },
      error: (err) => {
        console.log('Error in GetAllHotels', err);
      },
    });
  }

  addToWishlist(hotelId: number): void {
    const userId = +this.tokenService.getUserId();

    if (userId) {
      console.log(userId);
      this.addedWishList.userId = this.tokenService.getUserId();
      this.addedWishList.hotelId = hotelId;

      this.wishlistService.addToWishList(this.addedWishList).subscribe({
        next: (response) => {
          if (response.body == 'Insertion succeeded.') {
            console.log('Hotel added to wishlist', response);

            this.router.navigate(['/wishlist']); // Redirect to wishlist
          } else if (response.body == 'Hotel already exists in the wishlist.') {
            console.log('Hotel already exists in the wishlist.');
            this.errorMessage = 'Hotel already exists in the wishlist.';
          }
        },
        error: (err) => {
          console.error('Error adding hotel to wishlist', err);
          this.errorMessage = 'Error adding hotel to wishlist';
        },
      });
    } else {
      console.error('User ID not found in token');
      this.errorMessage = 'Please Login first';
      this.Login();
    }
  }
  getNumberofRooms(hotelId: number) {
    this.roomService.getRoomCount(hotelId).subscribe({
      next: (data) => {
        // this.roomNum = data.body;
        this.roomCounts[hotelId] = data.body;
        console.log('Room Count', this.roomCounts);

        // Filter hotels based on room counts
        this.results = this.results.filter((hotel: any) => this.roomCounts[hotel.id] > 0);
        console.log('Filtered Hotels Result', this.results);
      },
      error: (err) => {
        console.log('Error on getting Room Number', err);
      },
    });
  }
  getHotelsWithRooms(): void {
    this.HotelService.getallHotels().subscribe({
      next: (response) => {
        const hotels = response.body;
        if (Array.isArray(hotels)) {
          const roomCountObservables = hotels.map((hotel) =>
            this.roomService.getRoomCount(hotel.id).pipe(
              map((roomCount:any) => ({
                hotel,
                roomCount: roomCount.body,
              }))
            )
          );

          forkJoin(roomCountObservables).subscribe({
            next: (results) => {
              this.results = results
                .filter((result) => result.roomCount > 0)
                .map((result) => result.hotel);
              console.log('Filtered Hotels Result', this.results);
            },
            error: (err) => {
              console.error('Error fetching room counts:', err);
            },
          });
        } else {
          console.error('Expected an array of hotels but received:', hotels);
        }
      },
      error: (error) => {
        console.error('Error fetching hotels:', error);
      },
    });
  }
  Login(){
    this.router.navigate(['login']);
  }
  navigateToDetails(hotelId: number) {
    if (this.tokenService.getAccessToken()) {
      this.router.navigate(['/details', hotelId]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
