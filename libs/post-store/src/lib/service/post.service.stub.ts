import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';

import { mockPostList } from '../mocks/index';
import { Post } from '../model/index';

@Injectable()
export class PostServiceStubSuccessful {
  public getPosts(): Observable<Post[]> {
    return of(mockPostList);
  }
}

@Injectable()
export class PostServiceStubFailed {
  public getPosts(): Observable<Post[]> {
    return new Observable((observer: Observer<any>) => {
      observer.error('Failed request');
      observer.complete();
    });
  }
}
