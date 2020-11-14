import { TestBed } from '@angular/core/testing';
import { mockPostList } from '@app/mocks';
import {
  DataRequestService,
  DataRequestServiceStubFailed,
  DataRequestServiceStubSuccessful,
} from '@app/service';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import { LoadPosts, LoadPostsError, LoadPostsSuccess } from './post.actions';
import { PostEffects } from './post.effects';

describe('PostEffects', () => {
  let actions: Observable<any>;
  let effects: PostEffects;

  describe('Successful Requests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
        providers: [
          {
            provide: DataRequestService,
            useClass: DataRequestServiceStubSuccessful,
          },
          PostEffects,
          provideMockActions(() => actions),
        ],
      });
    });

    beforeEach(() => {
      effects = TestBed.inject(PostEffects);
    });

    it('should dispatch a new LoadPostsSuccess', () => {
      actions = hot('-a-|', { a: new LoadPosts(5) });
      expect(effects.loadPosts$).toBeObservable(
        cold('-a-|', { a: new LoadPostsSuccess(mockPostList) })
      );
    });
  });

  describe('Failed Requests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
        providers: [
          {
            provide: DataRequestService,
            useClass: DataRequestServiceStubFailed,
          },
          PostEffects,
          provideMockActions(() => actions),
        ],
      });
    });

    beforeEach(() => {
      effects = TestBed.inject(PostEffects);
    });

    it('should dispatch a new LoadPostsError', () => {
      actions = hot('-a-|', { a: new LoadPosts(5) });
      expect(effects.loadPosts$).toBeObservable(
        cold('-a-|', { a: new LoadPostsError() })
      );
    });
  });
});
