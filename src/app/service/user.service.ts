import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from '../app.constants';
import { Observable } from 'rxjs';
import { User } from '../store/user';

@Injectable()
export class UserService {
  private baseURL = APP_CONSTANTS.baseURL;

  public constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    const url = this.baseURL + 'users';
    return this.http.get<User[]>(url);
  }
}
