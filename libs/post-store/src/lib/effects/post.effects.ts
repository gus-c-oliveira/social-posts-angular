import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PostService } from '../service/index';
import { PostActions } from '../actions/index';

@Injectable()
export class PostEffects {
  public loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      switchMap((action) =>
        this.service.getPosts(action.id).pipe(
          map((posts) => PostActions.loadPostsSuccess({ posts })),
          catchError(() => of(PostActions.loadPostsError()))
        )
      )
    )
  );

  public constructor(private service: PostService, private actions$: Actions) {}
}
