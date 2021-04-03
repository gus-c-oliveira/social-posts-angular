import { Post } from '../model/index';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export const POST_STATE_KEY = 'post';

export interface PostState extends EntityState<Post> {
  error: boolean;
  loading: boolean;
  selectedPostID: number;
}

export const adapter = createEntityAdapter<Post>();

export const initialPostState: PostState = adapter.getInitialState({
  loading: false,
  error: false,
  selectedPostID: null,
});
