import { createFeatureSelector, createSelector } from '@ngrx/store';

import { COMMENT_STATE_KEY, CommentState, adapter } from '../state/index';

const getCommentState = createFeatureSelector<CommentState>(COMMENT_STATE_KEY);

const getLoading = createSelector(
  getCommentState,
  (state: CommentState): boolean => !!state.loading
);

const getError = createSelector(
  getCommentState,
  (state: CommentState): boolean => !!state.error
);

const adapterSelectors = adapter.getSelectors();

const getComments = createSelector(getCommentState, adapterSelectors.selectAll);

export const commentQuery = {
  getLoading,
  getError,
  getComments,
};
