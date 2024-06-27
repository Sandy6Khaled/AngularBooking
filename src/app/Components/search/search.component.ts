import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  @Input() results: any[] = [];
  @Input() errorSearch: string = '';
  errorMessage: string = '';
  ngOnInit(): void {
    console.log('Result', this.results);
    this.errorMessage = this.errorSearch;
    console.log(this.errorSearch);
  }
}
