import { RouterReducerState } from '@ngrx/router-store';

import { UserState, initialUserState } from '../user';

export interface AppState {
  router?: RouterReducerState;
  user: UserState;
}

export const initialAppState = {
  user: initialUserState,
};

export const getInitialAppState = (): AppState => initialAppState;
