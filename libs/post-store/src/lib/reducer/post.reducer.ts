import { PostAction, PostActionTypes } from '../actions/index';
import { Post } from '../model';
import { initialPostState, PostState } from '../state/index';

export const addImageToPost = (posts) => {
  return posts.map((post) => ({
    ...post,
    img: `https://picsum.photos/seed/${post.id}/500`,
  }));
};

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
      const posts = addImageToPost(action.posts);
      return {
        ...state,
        posts,
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
    case PostActionTypes.ClearSelectedPostID:
      return {
        ...state,
        selectedPostID: null,
      };
    default:
      return state;
  }
};
