import { TestBed } from '@angular/core/testing';
import { mockCommentList } from '@app/mocks';
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

import {
  LoadComments,
  LoadCommentsError,
  LoadCommentsSuccess,
} from './comment.actions';
import { CommentEffects } from './comment.effects';

describe('CommentEffects', () => {
  let actions: Observable<any>;
  let effects: CommentEffects;

  describe('Successful Requests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
        providers: [
          {
            provide: DataRequestService,
            useClass: DataRequestServiceStubSuccessful,
          },
          CommentEffects,
          provideMockActions(() => actions),
        ],
      });
    });

    beforeEach(() => {
      effects = TestBed.inject(CommentEffects);
    });

    it('should dispatch a new LoadCommentsSuccess', () => {
      actions = hot('-a-|', { a: new LoadComments(5) });
      expect(effects.loadComments$).toBeObservable(
        cold('-a-|', { a: new LoadCommentsSuccess(mockCommentList) })
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
          CommentEffects,
          provideMockActions(() => actions),
        ],
      });
    });

    beforeEach(() => {
      effects = TestBed.inject(CommentEffects);
    });

    it('should dispatch a new LoadCommentsError', () => {
      actions = hot('-a-|', { a: new LoadComments(5) });
      expect(effects.loadComments$).toBeObservable(
        cold('-a-|', { a: new LoadCommentsError() })
      );
    });
  });
});
