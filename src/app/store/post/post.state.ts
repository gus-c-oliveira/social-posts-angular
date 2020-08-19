import { Post } from './post.model';

export const POST_STATE_KEY = 'post';

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: boolean;
}

export const initialPostState: PostState = {
  posts: [],
  loading: false,
  error: false,
};
