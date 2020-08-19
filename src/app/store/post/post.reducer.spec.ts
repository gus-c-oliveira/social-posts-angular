import { mockPostList } from '@app/mocks';

import {
  LoadPosts,
  LoadPostsError,
  LoadPostsSuccess,
  SetSelectedPostID,
} from './post.actions';
import { postReducer } from './post.reducer';
import { initialPostState } from './post.state';

describe('postReducer', () => {
  describe('LoadPosts', () => {
    it('should set loading to true and error to false', () => {
      const newState = postReducer(initialPostState, new LoadPosts());
      expect(newState).toEqual({
        ...initialPostState,
        loading: true,
        error: false,
      });
    });
  });

  describe('LoadPostsSuccess', () => {
    it('should set Posts to received data and loading and error to false', () => {
      const newState = postReducer(
        initialPostState,
        new LoadPostsSuccess(mockPostList)
      );
      expect(newState).toEqual({
        ...initialPostState,
        loading: false,
        posts: mockPostList,
        error: false,
      });
    });
  });

  describe('LoadPostsError', () => {
    it('should set loading to false and error to true', () => {
      const newState = postReducer(initialPostState, new LoadPostsError());
      expect(newState).toEqual({
        ...initialPostState,
        loading: false,
        error: true,
      });
    });
  });

  describe('SetSelectedPostID', () => {
    it('should set the selected Post ID', () => {
      const newState = postReducer(initialPostState, new SetSelectedPostID(5));
      expect(newState).toEqual({
        ...initialPostState,
        selectedPostID: 5,
      });
    });
  });

  describe('Unknown action', () => {
    it('should return the original state without modifications', () => {
      const newState = postReducer(initialPostState, { type: null });
      expect(newState).toEqual(initialPostState);
    });
  });
});
