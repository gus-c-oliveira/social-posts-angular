import { createAction, props } from '@ngrx/store';

import { Post } from '../model/index';

export const loadPosts = createAction(
  '[Post] Load Posts',
  props<{ id: number }>()
);

export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: Post[] }>()
);

export const loadPostsError = createAction('[Post] Load Posts Error');

export const setSelectedPostID = createAction(
  '[Post] Set Selected Post ID',
  props<{ id: number }>()
);

export const clearSelectedPostID = createAction(
  '[Post] Clear Selected Post ID'
);

export const clearPosts = createAction('[Post] Clear Posts');
