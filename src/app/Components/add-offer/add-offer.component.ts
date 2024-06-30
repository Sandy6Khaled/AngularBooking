import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OffersService } from '../../Services/offers.service';
import { TokenService } from '../../Services/token.service';
import { addedOffer } from '../../Models/Offers';

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule,ReactiveFormsModule,FormsModule],
  providers:[OffersService,TokenService],
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.css'
})
export class AddOfferComponent {
  offer: addedOffer = {
    description: '',
    startDate: '',
    endDate: '',
    discount: 0,
    userId: 0,
    hotelId: 0,
  };
  userId: number = 0;
  hotels: any[] = [];
  offerResponse:any;
  constructor(
    private readonly offerService: OffersService,
    private readonly token: TokenService,private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = +this.token.getUserId();
    this.offer.userId = this.userId;
    this.route.params.subscribe((params) => {
      this.offer.hotelId = +params['Id'];
    });
  }

  

  onSubmit() {
    console.log(this.offer);
    // Implement the submit logic to save the offer
    this.offerService.addOffer(this.offer).subscribe({
      next: (response) => {
        this.offerResponse=response.body;
        console.log("Add Offer Response",response);
      },
      error: (error) => {
        console.log("Add Offer Error",error);
      }
    })
  }

  Home() {
    // Implement the logic to navigate to home
    this.router.navigate(['/home']);
  }
}
