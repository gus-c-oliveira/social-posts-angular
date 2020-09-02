import { Injectable } from '@angular/core';
import { mockCommentList, mockPostList, mockUserList } from '@app/mocks';
import { Comment, Post, User } from '@app/store';
import { Observable, of } from 'rxjs';

@Injectable()
export class DataRequestServiceSuccessful {
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
export class DataRequestServiceFailed {
  public getUsers(): Observable<User[]> {
    throw new Error('Request Failed!');
  }

  public getPosts(userId: number): Observable<Post[]> {
    throw new Error('Request Failed!');
  }

  public getComments(postId: number): Observable<Comment[]> {
    throw new Error('Request Failed!');
  }
}
