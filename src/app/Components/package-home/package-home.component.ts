import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../../Services/hotels.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-package-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [HotelsService],
  templateUrl: './package-home.component.html',
  styleUrl: './package-home.component.css',
})
export class PackageHomeComponent implements OnInit {
  results: any;
  constructor(public HotelService: HotelsService) {}
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
}
