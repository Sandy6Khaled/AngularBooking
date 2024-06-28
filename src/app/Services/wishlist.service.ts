import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addedAndDeletedWishList } from '../Models/addedAndDeletedWishList';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private readonly http: HttpClient) {}
  private readonly DB_url = 'https://localhost:7182/api/WishList';
  getbyUserId(userId: number) {
    return this.http.get(`${this.DB_url}/${userId}`, { observe: 'response' });
  }

  addToWishList(addedWishList: addedAndDeletedWishList): Observable<any> {
    return this.http.post(this.DB_url, addedWishList, {
      observe: 'response',
      responseType: 'text',
    });
  }

  removeFromWishList(removedWishList: addedAndDeletedWishList): Observable<any> {
    return this.http.request('delete', `${this.DB_url}`, {body: removedWishList,observe:"response",responseType:"text"});
  }
}
