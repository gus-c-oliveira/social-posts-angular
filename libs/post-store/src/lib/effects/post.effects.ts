import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PostService } from '../service/index';
import {
  LoadPostsError,
  LoadPostsSuccess,
  PostActionTypes,
  LoadPosts,
} from '../actions/index';

@Injectable()
export class PostEffects {
  @Effect()
  loadPosts$ = this.actions$.pipe(
    ofType(PostActionTypes.LoadPosts),
    switchMap((action) =>
      this.service.getPosts((action as LoadPosts).userId).pipe(
        map((data) => new LoadPostsSuccess(data)),
        catchError((error) => of(new LoadPostsError()))
      )
    )
  );

  public constructor(private service: PostService, private actions$: Actions) {}
}
