import { TestBed, waitForAsync } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from '@nrwl/angular/testing';
import { Observable, Observer, of } from 'rxjs';

import { PostActions } from '../actions/index';
import { mockPostList } from '../mocks/index';
import { PostService, PostServiceStub } from '../service/index';
import { PostEffects } from './post.effects';

const failedRequestObservable = new Observable((observer: Observer<any>) => {
  observer.error('failed request!');
  observer.complete();
});

describe('PostEffects', () => {
  let actions: Observable<any>;
  let effects: PostEffects;
  let service: PostService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
        providers: [
          { provide: PostService, useClass: PostServiceStub },
          PostEffects,
          provideMockActions(() => actions),
        ],
      });
    })
  );

  beforeEach(() => {
    effects = TestBed.inject(PostEffects);
    service = TestBed.inject(PostService);
  });

  describe('Successful Post Requests', () => {
    it('should dispatch a new LoadPostsSuccess', () => {
      spyOn(service, 'getPosts').and.returnValue(of(mockPostList));
      actions = hot('-a-|', { a: PostActions.loadPosts({ id: 5 }) });
      expect(effects.loadPosts$).toBeObservable(
        cold('-a-|', {
          a: PostActions.loadPostsSuccess({ posts: mockPostList }),
        })
      );
    });
  });

  describe('Failed Post Requests', () => {
    it('should dispatch a new LoadPostsError', () => {
      spyOn(service, 'getPosts').and.returnValue(failedRequestObservable);
      actions = hot('-a-|', { a: PostActions.loadPosts({ id: 5 }) });
      expect(effects.loadPosts$).toBeObservable(
        cold('-a-|', { a: PostActions.loadPostsError() })
      );
    });
  });
});
