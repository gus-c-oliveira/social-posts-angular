import { RouterReducerState } from '@ngrx/router-store';

import { initialUserState, USER_STATE_KEY, UserState } from '../user';

export interface AppState {
  router?: RouterReducerState;
  [USER_STATE_KEY]: UserState;
}

export const initialAppState = {
  [USER_STATE_KEY]: initialUserState,
};

export const getInitialAppState = (): AppState => initialAppState;
