import { Injectable } from '@angular/core';
import { DataRequestService } from '@app/service';
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
      this.service.getComments((action as LoadComments).postId).pipe(
        map((data) => new LoadCommentsSuccess(data)),
        catchError((error) => of(new LoadCommentsError()))
      )
    )
  );

  public constructor(
    private service: DataRequestService,
    private actions$: Actions
  ) {}
}
