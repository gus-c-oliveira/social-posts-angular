import { Comment } from './comment.model';

export type RequestDataState = 'empty' | 'loading' | 'loaded' | 'error';

export interface CommentData {
  state: RequestDataState;
  comments: Comment[];
}
