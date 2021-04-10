import { TestBed, waitForAsync } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import { UserActions } from '../actions/index';
import { UserEffects } from '../effects/index';
import { mockUserList } from '../mocks/index';
import {
  UserService,
  UserServiceStubFailed,
  UserServiceStubSuccessful,
} from '../service/index';

describe('UserEffects', () => {
  let actions: Observable<any>;
  let effects: UserEffects;

  describe('Successful Requests', () => {
    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
          providers: [
            {
              provide: UserService,
              useClass: UserServiceStubSuccessful,
            },
            UserEffects,
            provideMockActions(() => actions),
          ],
        });
      })
    );

    beforeEach(() => {
      effects = TestBed.inject(UserEffects);
    });

    it('should dispatch a new LoadUsersSuccess', () => {
      actions = hot('-a-|', { a: UserActions.loadUsers() });
      expect(effects.loadUsers$).toBeObservable(
        cold('-a-|', {
          a: UserActions.loadUsersSuccess({ users: mockUserList }),
        })
      );
    });
  });

  describe('Failed Requests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
        providers: [
          {
            provide: UserService,
            useClass: UserServiceStubFailed,
          },
          UserEffects,
          provideMockActions(() => actions),
        ],
      });
    });

    beforeEach(() => {
      effects = TestBed.inject(UserEffects);
    });

    it('should dispatch a new LoadUsersError', () => {
      actions = hot('-a-|', { a: UserActions.loadUsers() });
      expect(effects.loadUsers$).toBeObservable(
        cold('-a-|', { a: UserActions.loadUsersError() })
      );
    });
  });
});
