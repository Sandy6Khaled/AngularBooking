import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateServiceService {

  private profileUpdatedSource = new Subject<void>();

  profileUpdated$ = this.profileUpdatedSource.asObservable();

  notifyProfileUpdated() {
    this.profileUpdatedSource.next();
  }
}
