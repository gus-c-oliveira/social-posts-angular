import { createAction, props } from '@ngrx/store';

import { User } from '../model/index';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersError = createAction('[User] Load Users Error');

export const setSelectedUserID = createAction(
  '[User] Set Selected User ID',
  props<{ id: number }>()
);

export const clearSelectedUserID = createAction(
  '[User] Clear Selected User ID'
);
