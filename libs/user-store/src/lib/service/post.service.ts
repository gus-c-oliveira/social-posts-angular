import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Comment, CommentData, Post } from '../model/index';
import { SERVICE_BASE_URL } from '../token';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private commentsSubject$ = new BehaviorSubject<CommentData>({
    state: 'empty',
    comments: [],
  });
  public readonly comments$ = this.commentsSubject$.asObservable();

  public constructor(
    @Inject(SERVICE_BASE_URL) private baseURL: string,
    private http: HttpClient
  ) {}

  public getPosts(userId: number): Observable<Post[]> {
    const url = this.baseURL + `posts?userId=${userId}`;
    return this.http.get<Post[]>(url);
  }

  public loadPostComments(postId: number) {
    this.commentsSubject$.next({ state: 'loading', comments: [] });
    const url = this.baseURL + `comments?postId=${postId}`;
    this.http.get<Comment[]>(url).subscribe(
      (comments) => this.commentsSubject$.next({ state: 'loaded', comments }),
      () => this.commentsSubject$.next({ state: 'error', comments: [] })
    );
  }

  public clearComments() {
    this.commentsSubject$.next({ state: 'empty', comments: [] });
  }
}
