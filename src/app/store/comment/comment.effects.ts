import { Injectable } from '@angular/core';
import { CommentService } from '@app/service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  LoadCommentsError,
  LoadCommentsSuccess,
  CommentActionTypes,
  LoadComments,
} from './comment.actions';

@Injectable()
export class CommentEffects {
  @Effect()
  loadComments$ = this.actions$.pipe(
    ofType(CommentActionTypes.LoadComments),
    switchMap((action) =>
      this.commentService.getComments((action as LoadComments).postId).pipe(
        map((data) => new LoadCommentsSuccess(data)),
        catchError((error) => of(new LoadCommentsError()))
      )
    )
  );

  public constructor(
    private commentService: CommentService,
    private actions$: Actions
  ) {}
}
