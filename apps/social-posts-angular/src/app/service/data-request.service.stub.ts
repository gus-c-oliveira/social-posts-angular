import { Injectable } from '@angular/core';
import { mockCommentList, mockPostList } from '@app/mocks';
import { Comment, Post } from '@app/store';
import { Observable, Observer, of } from 'rxjs';

@Injectable()
export class DataRequestServiceStubSuccessful {
  public getPosts(userId: number): Observable<Post[]> {
    return of(mockPostList);
  }

  public getComments(postId: number): Observable<Comment[]> {
    return of(mockCommentList);
  }
}

@Injectable()
export class DataRequestServiceStubFailed {
  public getPosts(userId: number): Observable<Post[]> {
    return new Observable((observer: Observer<any>) => {
      observer.error('Failed request');
      observer.complete();
    });
  }

  public getComments(postId: number): Observable<Comment[]> {
    return new Observable((observer: Observer<any>) => {
      observer.error('Failed request');
      observer.complete();
    });
  }
}
