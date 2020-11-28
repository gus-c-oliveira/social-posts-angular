import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';

import { User } from '../model/index';
import { mockUserList } from '../mocks/index';

@Injectable()
export class UserServiceStubSuccessful {
  public getUsers(): Observable<User[]> {
    return of(mockUserList);
  }
}

@Injectable()
export class UserServiceStubFailed {
  public getUsers(): Observable<User[]> {
    return new Observable((observer: Observer<any>) => {
      observer.error('Failed request');
      observer.complete();
    });
  }
}
