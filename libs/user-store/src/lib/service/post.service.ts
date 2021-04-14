import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  Comment,
  RequestData,
  Post,
  emptyRequestData,
  loadingRequestData,
  errorRequestData,
} from '../model/index';
import { SERVICE_BASE_URL } from '../token';
import { addImageToPost } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsSubject$ = new BehaviorSubject<RequestData>({
    state: 'empty',
    data: [],
  });
  private commentsSubject$ = new BehaviorSubject<RequestData>({
    state: 'empty',
    data: [],
  });

  public readonly selectedPost$ = new BehaviorSubject<Post>(null);
  public readonly posts$ = this.postsSubject$.asObservable();
  public readonly comments$ = this.commentsSubject$.asObservable();

  public constructor(
    @Inject(SERVICE_BASE_URL) private baseURL: string,
    private http: HttpClient
  ) {}

  public loadPosts(userId: number) {
    this.postsSubject$.next(loadingRequestData);
    const url = this.baseURL + `posts?userId=${userId}`;
    this.http.get<Post[]>(url).subscribe(
      (posts) =>
        this.postsSubject$.next({
          state: 'loaded',
          data: addImageToPost(posts),
        }),
      () => this.postsSubject$.next(errorRequestData)
    );
  }

  public loadPostComments(postId: number) {
    this.commentsSubject$.next(loadingRequestData);
    const url = this.baseURL + `comments?postId=${postId}`;
    this.http.get<Comment[]>(url).subscribe(
      (comments) =>
        this.commentsSubject$.next({ state: 'loaded', data: comments }),
      () => this.commentsSubject$.next(errorRequestData)
    );
  }

  public setSelectedPost(id: number) {
    const selectedPost = this.postsSubject$.value.data.find(
      (post) => post.id === id
    );
    this.selectedPost$.next(selectedPost);
  }

  public clearSelectedPost() {
    this.selectedPost$.next(null);
  }

  public clearPosts() {
    this.postsSubject$.next(emptyRequestData);
  }

  public clearComments() {
    this.commentsSubject$.next(emptyRequestData);
  }
}
