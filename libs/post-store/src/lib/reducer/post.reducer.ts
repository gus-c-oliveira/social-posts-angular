import { createReducer, on } from '@ngrx/store';

import { PostActions } from '../actions/index';
import { Post } from '../model/index';
import { adapter, initialPostState } from '../state/index';

export const addImageToPost = (posts) => {
  return posts.map((post) => ({
    ...post,
    img: `https://picsum.photos/seed/${post.id}/500`,
  }));
};

export const postReducer = createReducer(
  initialPostState,
  on(PostActions.loadPosts, (state) => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(PostActions.loadPostsSuccess, (state, action) => {
    const posts: Post[] = addImageToPost(action.posts);
    return adapter.addAll(posts, { ...state, loading: false, error: false });
  }),
  on(PostActions.loadPostsError, (state) => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(PostActions.setSelectedPostID, (state, action) => ({
    ...state,
    selectedPostID: action.id,
  })),
  on(PostActions.clearSelectedPostID, (state) => ({
    ...state,
    selectedPostID: null,
  })),
  on(PostActions.clearPosts, (state) => adapter.removeAll(state))
);
