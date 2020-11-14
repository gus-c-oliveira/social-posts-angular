import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Post } from './post.model';
import { POST_STATE_KEY, PostState } from './post.state';

const getPostState = createFeatureSelector<PostState>(POST_STATE_KEY);

const getLoading = createSelector(
  getPostState,
  (state: PostState): boolean => !!state.loading
);

const getError = createSelector(
  getPostState,
  (state: PostState): boolean => !!state.error
);

const getPosts = createSelector(
  getPostState,
  (state: PostState): Post[] => state.posts || []
);

const getSelectedPostID = createSelector(
  getPostState,
  (state: PostState): number => state.selectedPostID
);

const getSelectedPost = createSelector(
  getPostState,
  (state: PostState): Post =>
    state.posts.find((post) => post.id === state.selectedPostID)
);

export const postQuery = {
  getLoading,
  getError,
  getSelectedPostID,
  getPosts,
  getSelectedPost,
};
