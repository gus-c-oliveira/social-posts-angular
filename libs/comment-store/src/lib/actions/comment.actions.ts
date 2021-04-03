import { createAction, props } from '@ngrx/store';

import { Comment } from '../model/index';

export const loadComments = createAction(
  '[Comment] Load Comments',
  props<{ id: number }>()
);

export const loadCommentsSuccess = createAction(
  '[Comment] Load Comments Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentsError = createAction('[Comment] Load Comments Error');

export const clearComments = createAction('[Comment] Clear Comments');
