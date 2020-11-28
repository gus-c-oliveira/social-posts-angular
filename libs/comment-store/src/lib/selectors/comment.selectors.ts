import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Comment } from '../model/index';
import { COMMENT_STATE_KEY, CommentState } from '../state/index';

const getCommentState = createFeatureSelector<CommentState>(COMMENT_STATE_KEY);

const getLoading = createSelector(
  getCommentState,
  (state: CommentState): boolean => !!state.loading
);

const getError = createSelector(
  getCommentState,
  (state: CommentState): boolean => !!state.error
);

const getComments = createSelector(
  getCommentState,
  (state: CommentState): Comment[] => state.comments || []
);

export const commentQuery = {
  getLoading,
  getError,
  getComments,
};
