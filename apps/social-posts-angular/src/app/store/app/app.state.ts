import { RouterReducerState } from '@ngrx/router-store';

import {
  COMMENT_STATE_KEY,
  CommentState,
  initialCommentState,
} from '../comment';

export interface AppState {
  router?: RouterReducerState;
  [COMMENT_STATE_KEY]: CommentState;
}

export const initialAppState: AppState = {
  [COMMENT_STATE_KEY]: initialCommentState,
};

export const getInitialAppState = (): AppState => initialAppState;
