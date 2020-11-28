import { Action } from '@ngrx/store';

import { User } from '../model/index';

export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUsersError = '[User] Load Users Error',
  SetSelectedUserID = '[User] Set Selected User ID',
  ClearSelectedUserID = '[User] Clear Selected User ID',
}

export class LoadUsers implements Action {
  public readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  public readonly type = UserActionTypes.LoadUsersSuccess;

  public constructor(public users: User[]) {}
}

export class LoadUsersError implements Action {
  public readonly type = UserActionTypes.LoadUsersError;
}

export class SetSelectedUserID implements Action {
  public readonly type = UserActionTypes.SetSelectedUserID;

  public constructor(public id: number) {}
}

export class ClearSelectedUserID implements Action {
  public readonly type = UserActionTypes.ClearSelectedUserID;
}

export type UserAction =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersError
  | SetSelectedUserID
  | ClearSelectedUserID;
