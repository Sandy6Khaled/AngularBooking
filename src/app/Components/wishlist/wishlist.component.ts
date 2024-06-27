import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../Services/wishlist.service';

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
constructor(private wishListService:WishlistService){}
  ngOnInit(): void {
    
  }
  getWishListsByClientId(){

  }

}
