import { Injectable } from '@angular/core';
import { mockUserList } from '@app/mocks';
import { User } from '@app/store';
import { Observable, Observer, of } from 'rxjs';

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
