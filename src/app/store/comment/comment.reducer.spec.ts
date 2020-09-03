import { mockCommentList } from '@app/mocks';

import {
  LoadComments,
  LoadCommentsError,
  LoadCommentsSuccess,
  ClearComments,
} from './comment.actions';
import { commentReducer } from './comment.reducer';
import { initialCommentState } from './comment.state';

describe('commentReducer', () => {
  describe('LoadComments', () => {
    it('should set loading to true and error to false', () => {
      const newState = commentReducer(initialCommentState, new LoadComments(1));
      expect(newState).toEqual({
        ...initialCommentState,
        loading: true,
        error: false,
      });
    });
  });

  describe('LoadCommentsSuccess', () => {
    it('should set comments to received data and loading and error to false', () => {
      const newState = commentReducer(
        initialCommentState,
        new LoadCommentsSuccess(mockCommentList)
      );
      expect(newState).toEqual({
        ...initialCommentState,
        loading: false,
        comments: mockCommentList,
        error: false,
      });
    });
  });

  describe('LoadCommentsError', () => {
    it('should set loading to false and error to true', () => {
      const newState = commentReducer(
        initialCommentState,
        new LoadCommentsError()
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
        { ...initialCommentState, comments: mockCommentList },
        new ClearComments()
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
