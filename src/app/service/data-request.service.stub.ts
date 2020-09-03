import { Injectable } from '@angular/core';
import { mockCommentList, mockPostList, mockUserList } from '@app/mocks';
import { Comment, Post, User } from '@app/store';
import { Observable, Observer, of } from 'rxjs';

@Injectable()
export class DataRequestServiceStubSuccessful {
  public getUsers(): Observable<User[]> {
    return of(mockUserList);
  }

  public getPosts(userId: number): Observable<Post[]> {
    return of(mockPostList);
  }

  public getComments(postId: number): Observable<Comment[]> {
    return of(mockCommentList);
  }
}

@Injectable()
export class DataRequestServiceStubFailed {
  public getUsers(): Observable<User[]> {
    return new Observable((observer: Observer<any>) => {
      observer.error('Failed request');
      observer.complete();
    });
  }

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
