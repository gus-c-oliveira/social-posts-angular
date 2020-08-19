import { Injectable } from '@angular/core';
import { mockPostList } from '@app/mocks';
import { Post } from '@app/store';
import { Observable, Observer, of } from 'rxjs';

@Injectable()
export class PostServiceStubSuccessful {
  public getPosts(userId: number): Observable<Post[]> {
    return of(mockPostList);
  }
}

@Injectable()
export class PostServiceStubFailed {
  public getPosts(userId: number): Observable<Post[]> {
    return new Observable((observer: Observer<any>) => {
      observer.error('Failed request');
      observer.complete();
    });
  }
}
