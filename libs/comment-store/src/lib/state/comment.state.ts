import { Comment } from '../model/index';

export const COMMENT_STATE_KEY = 'comment';

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: boolean;
}

export const initialCommentState: CommentState = {
  comments: [],
  loading: false,
  error: false,
};
