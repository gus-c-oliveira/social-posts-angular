import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CommentActions } from '../actions/index';
import { CommentService } from '../service/index';

@Injectable()
export class CommentEffects {
  public loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.loadComments),
      switchMap((action) =>
        this.service.getComments(action.id).pipe(
          map((comments) => CommentActions.loadCommentsSuccess({ comments })),
          catchError(() => of(CommentActions.loadCommentsError()))
        )
      )
    )
  );

  public constructor(
    private service: CommentService,
    private actions$: Actions
  ) {}
}
