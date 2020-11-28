import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';

import { mockCommentList } from '../mocks/index';
import { Comment } from '../model/index';

@Injectable()
export class CommentServiceStubSuccessful {
  public getComments(postId: number): Observable<Comment[]> {
    return of(mockCommentList);
  }
}

@Injectable()
export class CommentServiceStubFailed {
  public getComments(postId: number): Observable<Comment[]> {
    return new Observable((observer: Observer<any>) => {
      observer.error('Failed request');
      observer.complete();
    });
  }
}
