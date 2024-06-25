import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  @Input() results: any[] = [];
  ngOnInit(): void {
    console.log(this.results);
    
  }
  
  
}
