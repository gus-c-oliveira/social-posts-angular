import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { USER_SERVICE_BASE_URL } from '../token';
import { User } from '../model/index';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public constructor(
    @Inject(USER_SERVICE_BASE_URL) private baseURL: string,
    private http: HttpClient
  ) {}

  public getUsers(): Observable<User[]> {
    const url = this.baseURL + 'users';
    return this.http.get<User[]>(url);
  }
}
