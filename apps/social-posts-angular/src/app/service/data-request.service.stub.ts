import { Injectable } from '@angular/core';
import { mockCommentList } from '@app/mocks';
import { Comment } from '@app/store';
import { Observable, Observer, of } from 'rxjs';

@Injectable()
export class DataRequestServiceStubSuccessful {
  public getComments(postId: number): Observable<Comment[]> {
    return of(mockCommentList);
  }
}

@Injectable()
export class DataRequestServiceStubFailed {
  public getComments(postId: number): Observable<Comment[]> {
    return new Observable((observer: Observer<any>) => {
      observer.error('Failed request');
      observer.complete();
    });
  }
}
