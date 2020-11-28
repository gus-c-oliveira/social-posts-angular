import { RouterReducerState } from '@ngrx/router-store';

import {
  COMMENT_STATE_KEY,
  CommentState,
  initialCommentState,
} from '../comment';
import { initialPostState, POST_STATE_KEY, PostState } from '../post';

export interface AppState {
  router?: RouterReducerState;
  [POST_STATE_KEY]: PostState;
  [COMMENT_STATE_KEY]: CommentState;
}

export const initialAppState: AppState = {
  [POST_STATE_KEY]: initialPostState,
  [COMMENT_STATE_KEY]: initialCommentState,
};

export const getInitialAppState = (): AppState => initialAppState;
