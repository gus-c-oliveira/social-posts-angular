import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment, Post, User } from '@app/store';
import { Observable } from 'rxjs';

import { APP_CONSTANTS } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class DataRequestService {
  private baseURL = APP_CONSTANTS.baseURL;

  public constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    const url = this.baseURL + 'users';
    return this.http.get<User[]>(url);
  }

  public getPosts(userId: number): Observable<Post[]> {
    const url = this.baseURL + `posts?userId=${userId}`;
    return this.http.get<Post[]>(url);
  }

  public getComments(postId: number): Observable<Comment[]> {
    const url = this.baseURL + `comments?postId=${postId}`;
    return this.http.get<Comment[]>(url);
  }
}
