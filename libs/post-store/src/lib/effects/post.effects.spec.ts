import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import {
  PostService,
  PostServiceStubFailed,
  PostServiceStubSuccessful,
} from '../service/index';
import { LoadPosts, LoadPostsError, LoadPostsSuccess } from '../actions/index';
import { PostEffects } from './post.effects';
import { mockPostList } from '../mocks/index';

describe('PostEffects', () => {
  let actions: Observable<any>;
  let effects: PostEffects;

  describe('Successful Requests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
        providers: [
          {
            provide: PostService,
            useClass: PostServiceStubSuccessful,
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
            provide: PostService,
            useClass: PostServiceStubFailed,
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
