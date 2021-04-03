import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Comment } from '../model/index';

export const COMMENT_STATE_KEY = 'comment';

export interface CommentState extends EntityState<Comment> {
  loading: boolean;
  error: boolean;
}

export const adapter = createEntityAdapter<Comment>();

export const initialCommentState: CommentState = adapter.getInitialState({
  loading: false,
  error: false,
});
