import { RouterReducerState } from '@ngrx/router-store';

import {
  COMMENT_STATE_KEY,
  CommentState,
  initialCommentState,
} from '../comment';
import { initialPostState, POST_STATE_KEY, PostState } from '../post';
import { initialUserState, USER_STATE_KEY, UserState } from '../user';

export interface AppState {
  router?: RouterReducerState;
  [USER_STATE_KEY]: UserState;
  [POST_STATE_KEY]: PostState;
  [COMMENT_STATE_KEY]: CommentState;
}

export const initialAppState: AppState = {
  [USER_STATE_KEY]: initialUserState,
  [POST_STATE_KEY]: initialPostState,
  [COMMENT_STATE_KEY]: initialCommentState,
};

export const getInitialAppState = (): AppState => initialAppState;
