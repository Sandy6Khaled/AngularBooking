import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_url = "https://localhost:7182/api/Hotel";
  Search(city:string): Observable<any>{
    return this.http.get(this.DB_url+"/"+city,{observe:"response"});
  }
}
