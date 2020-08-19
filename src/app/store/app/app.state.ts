import { RouterReducerState } from '@ngrx/router-store';

import { initialUserState, USER_STATE_KEY, UserState } from '../user';
import { initialPostState, POST_STATE_KEY, PostState } from '../post';

export interface AppState {
  router?: RouterReducerState;
  [USER_STATE_KEY]: UserState;
  [POST_STATE_KEY]: PostState;
}

export const initialAppState: AppState = {
  [USER_STATE_KEY]: initialUserState,
  [POST_STATE_KEY]: initialPostState,
};

export const getInitialAppState = (): AppState => initialAppState;
