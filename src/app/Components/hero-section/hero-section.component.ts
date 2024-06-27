import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../Services/search.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,RouterModule],
  providers:[SearchService],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  searchTerm: string = "";

  @Output() searchResults: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() errorSearchResults: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchService: SearchService,private router:Router) {}

  onSearch() {
    console.log(this.searchTerm);
    
    if (this.searchTerm.trim()) {
      this.searchService.Search(this.searchTerm).subscribe({
        next: (response: HttpResponse<any>) => {
          const results = response.body as any[]; // assuming the API returns the results in the body
          this.searchResults.emit(results);
        },
        error: (error: HttpResponse<any>) => {
          console.error('Search error:', error);

          // this.searchResults.emit([error]);
          this.errorSearchResults.emit("OOPS!!! there is no Hotels found with this search");
          // this.router.navigate("")
        }
      });
    } else {
      // Emit an empty array to indicate no search term was provided
      this.searchResults.emit([]);
    }
  }

}
