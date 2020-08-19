import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@app/store';
import { Observable } from 'rxjs';

import { APP_CONSTANTS } from '../../app.constants';

@Injectable()
export class PostService {
  private baseURL = APP_CONSTANTS.baseURL;

  public constructor(private http: HttpClient) {}

  public getPosts(userId: number): Observable<Post[]> {
    const url = this.baseURL + `posts?userId=${userId}`;
    return this.http.get<Post[]>(url);
  }
}
