import { Post } from '../model/index';

export const POST_STATE_KEY = 'post';

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: boolean;
  selectedPostID: number;
}

export const initialPostState: PostState = {
  posts: [],
  loading: false,
  error: false,
  selectedPostID: null,
};
