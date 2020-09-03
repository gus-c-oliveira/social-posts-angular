import { Injectable } from '@angular/core';
import { DataRequestService } from '@app/service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  LoadUsersError,
  LoadUsersSuccess,
  UserActionTypes,
} from './user.actions';

@Injectable()
export class UserEffects {
  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUsers),
    switchMap((action) =>
      this.service.getUsers().pipe(
        map((data) => new LoadUsersSuccess(data)),
        catchError((error) => of(new LoadUsersError()))
      )
    )
  );

  public constructor(
    private service: DataRequestService,
    private actions$: Actions
  ) {}
}
