import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { UserActions } from '../actions/index';
import { UserService } from '../service/index';

@Injectable()
export class UserEffects {
  public loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.service.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError(() => of(UserActions.loadUsersError()))
        )
      )
    )
  );

  public constructor(private service: UserService, private actions$: Actions) {}
}
