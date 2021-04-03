import { mockCommentList } from '../mocks/index';
import { CommentActions } from '../actions/index';
import { commentReducer } from './comment.reducer';
import { initialCommentState } from '../state/index';
import { mapCommentsToEntities } from '../utils/index';

describe('commentReducer', () => {
  describe('LoadComments', () => {
    it('should set loading to true and error to false', () => {
      const newState = commentReducer(
        initialCommentState,
        CommentActions.loadComments({ id: 1 })
      );
      expect(newState).toEqual({
        ...initialCommentState,
        loading: true,
        error: false,
      });
    });
  });

  describe('LoadCommentsSuccess', () => {
    it(`should set comments to received data
        and loading and error to false`, () => {
      const newState = commentReducer(
        initialCommentState,
        CommentActions.loadCommentsSuccess({ comments: mockCommentList })
      );
      expect(newState).toEqual({
        ...initialCommentState,
        loading: false,
        entities: mapCommentsToEntities(mockCommentList),
        error: false,
        ids: mockCommentList.map((comment) => comment.id),
      });
    });
  });

  describe('LoadCommentsError', () => {
    it('should set loading to false and error to true', () => {
      const newState = commentReducer(
        initialCommentState,
        CommentActions.loadCommentsError()
      );
      expect(newState).toEqual({
        ...initialCommentState,
        loading: false,
        error: true,
      });
    });
  });

  describe('ClearComments', () => {
    it('should set comments to an empty array', () => {
      const newState = commentReducer(
        {
          ...initialCommentState,
          entities: mapCommentsToEntities(mockCommentList),
        },
        CommentActions.clearComments()
      );
      expect(newState).toEqual({ ...initialCommentState });
    });
  });

  describe('Unknown action', () => {
    it('should return the original state without modifications', () => {
      const newState = commentReducer(initialCommentState, { type: null });
      expect(newState).toEqual(initialCommentState);
    });
  });
});
