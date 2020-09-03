import { PostAction, PostActionTypes } from './post.actions';
import { initialPostState, PostState } from './post.state';

export const postReducer = (
  state: PostState = initialPostState,
  action: PostAction
): PostState => {
  switch (action.type) {
    case PostActionTypes.LoadPosts:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case PostActionTypes.LoadPostsSuccess:
      return {
        ...state,
        posts: action.posts,
        loading: false,
        error: false,
      };
    case PostActionTypes.LoadPostsError:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case PostActionTypes.SetSelectedPostID:
      return {
        ...state,
        selectedPostID: action.id,
      };
    case PostActionTypes.ClearPosts:
      return {
        ...state,
        posts: [],
      };
    default:
      return state;
  }
};
