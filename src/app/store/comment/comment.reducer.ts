import { CommentAction, CommentActionTypes } from './comment.actions';
import { CommentState, initialCommentState } from './comment.state';

export const commentReducer = (
  state: CommentState = initialCommentState,
  action: CommentAction
): CommentState => {
  switch (action.type) {
    case CommentActionTypes.LoadComments:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CommentActionTypes.LoadCommentsSuccess:
      return {
        ...state,
        comments: action.comments,
        loading: false,
        error: false,
      };
    case CommentActionTypes.LoadCommentsError:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
