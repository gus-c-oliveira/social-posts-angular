import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../model/index';
import { POST_SERVICE_BASE_URL } from '../token';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public constructor(
    @Inject(POST_SERVICE_BASE_URL) private baseURL: string,
    private http: HttpClient
  ) {}

  public getPosts(userId: number): Observable<Post[]> {
    const url = this.baseURL + `posts?userId=${userId}`;
    return this.http.get<Post[]>(url);
  }
}
