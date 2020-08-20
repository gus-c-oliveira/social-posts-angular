import { Injectable } from '@angular/core';
import { PostService } from '@app/service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  LoadPostsError,
  LoadPostsSuccess,
  PostActionTypes,
  LoadPosts,
} from './post.actions';

@Injectable()
export class PostEffects {
  @Effect()
  loadPosts$ = this.actions$.pipe(
    ofType(PostActionTypes.LoadPosts),
    switchMap((action) =>
      this.postService.getPosts((action as LoadPosts).userId).pipe(
        map((data) => new LoadPostsSuccess(data)),
        catchError((error) => of(new LoadPostsError()))
      )
    )
  );

  public constructor(
    private postService: PostService,
    private actions$: Actions
  ) {}
}
