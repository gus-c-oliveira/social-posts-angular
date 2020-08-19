import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/store';
import { Observable } from 'rxjs';

import { APP_CONSTANTS } from '../../app.constants';

@Injectable()
export class UserService {
  private baseURL = APP_CONSTANTS.baseURL;

  public constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    const url = this.baseURL + 'users';
    return this.http.get<User[]>(url);
  }
}
