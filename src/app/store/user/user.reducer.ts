import { Action } from '@ngrx/store';

import { initialUserState, UserState } from './user.state';

export const userReducer = (state: UserState, action: Action): UserState => {
  return initialUserState;
};
