import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers:[TokenService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  @Input() results: any[] = [];
  @Input() errorSearch: string = '';
  errorMessage: string = '';
  constructor(private tokenService:TokenService,private router:Router) { }
  ngOnInit(): void {
    console.log('Result', this.results);
    this.errorMessage = this.errorSearch;
    console.log(this.errorSearch);
  }
  navigateToDetails(hotelId: number) {
    if (this.tokenService.getAccessToken()) {
      this.router.navigate(['/details', hotelId]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
