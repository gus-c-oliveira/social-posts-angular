import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Comment } from '../model';
import { COMMENT_SERVICE_BASE_URL } from '../token';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  public constructor(
    @Inject(COMMENT_SERVICE_BASE_URL) private baseURL: string,
    private http: HttpClient
  ) {}

  public getComments(postId: number): Observable<Comment[]> {
    const url = this.baseURL + `comments?postId=${postId}`;
    return this.http.get<Comment[]>(url);
  }
}
