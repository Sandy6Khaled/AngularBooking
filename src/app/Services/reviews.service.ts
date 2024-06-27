import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_url = "https://localhost:7182/api/Review";
  getReviews(){
    return this.http.get(this.DB_url);
  }
}
