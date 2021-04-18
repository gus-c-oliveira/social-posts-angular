import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public readonly isLoggedIn$ = this.loggedInSubject.asObservable();

  public login() {
    this.loggedInSubject.next(true);
  }

  public logout() {
    this.loggedInSubject.next(false);
  }
}
