import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addedReview } from '../Models/AddReview';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_url = "https://localhost:7182/api/Review";
  getReviews(){
    return this.http.get(this.DB_url);
  }
  addReview(clientId:number,hotelId:number,review:addedReview):Observable<any>{
    return this.http.post(`${this.DB_url}/${clientId}/${hotelId}`,review,{observe:"response",responseType:"text"}).pipe();
  }
}
