import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Post } from '../model/index';
import { POST_STATE_KEY, PostState, adapter } from '../state/index';

const getPostState = createFeatureSelector<PostState>(POST_STATE_KEY);

const adapterSelectors = adapter.getSelectors();

const getLoading = createSelector(
  getPostState,
  (state: PostState): boolean => !!state.loading
);

const getError = createSelector(
  getPostState,
  (state: PostState): boolean => !!state.error
);

const getPosts = createSelector(getPostState, adapterSelectors.selectAll);

const getSelectedPostID = createSelector(
  getPostState,
  (state: PostState): number => state.selectedPostID
);

const getPostEntities = createSelector(
  getPostState,
  adapterSelectors.selectEntities
);

const getSelectedPost = createSelector(
  getPostEntities,
  getSelectedPostID,
  (entities: { [id: number]: Post }, id: number): Post => entities[id]
);

export const postQuery = {
  getLoading,
  getError,
  getSelectedPostID,
  getPosts,
  getSelectedPost,
};
