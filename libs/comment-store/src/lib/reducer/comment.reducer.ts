import { createReducer, on } from '@ngrx/store';

import { CommentActions } from '../actions/index';
import { initialCommentState, adapter } from '../state/index';

export const commentReducer = createReducer(
  initialCommentState,
  on(CommentActions.loadComments, (state) => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(CommentActions.loadCommentsSuccess, (state, action) =>
    adapter.addAll(action.comments, { ...state, loading: false, error: false })
  ),
  on(CommentActions.loadCommentsError, (state) => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(CommentActions.clearComments, (state) => adapter.removeAll(state))
);
