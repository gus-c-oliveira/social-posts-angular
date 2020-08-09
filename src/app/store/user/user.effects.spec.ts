import { TestBed } from '@angular/core/testing';
import { mockUserList } from '@app/mocks';
import {
  UserService,
  UserServiceStubFailed,
  UserServiceStubSuccessful,
} from '@app/service';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import { LoadUsers, LoadUsersError, LoadUsersSuccess } from './user.actions';
import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions: Observable<any>;
  let effects: UserEffects;

  describe('Successful Requests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
        providers: [
          { provide: UserService, useClass: UserServiceStubSuccessful },
          UserEffects,
          provideMockActions(() => actions),
        ],
      });
      effects = TestBed.inject(UserEffects);
    });

    it('should dispatch a new LoadUsersSuccess', () => {
      actions = hot('-a-|', { a: new LoadUsers() });
      expect(effects.loadUsers$).toBeObservable(
        cold('-a-|', { a: new LoadUsersSuccess(mockUserList) })
      );
    });
  });

  describe('Failed Requests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
        providers: [
          { provide: UserService, useClass: UserServiceStubFailed },
          UserEffects,
          provideMockActions(() => actions),
        ],
      });
      effects = TestBed.inject(UserEffects);
    });

    it('should dispatch a new LoadUsersError', () => {
      actions = hot('-a-|', { a: new LoadUsers() });
      expect(effects.loadUsers$).toBeObservable(
        cold('-a-|', { a: new LoadUsersError() })
      );
    });
  });
});
