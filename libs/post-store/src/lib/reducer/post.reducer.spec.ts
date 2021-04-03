import { PostActions } from '../actions/index';
import { mockPostList } from '../mocks/index';
import { initialPostState } from '../state/index';
import { mapPostsToEntities } from '../utils/index';
import { postReducer, addImageToPost } from './post.reducer';

describe('postReducer', () => {
  describe('LoadPosts', () => {
    it('should set loading to true and error to false', () => {
      const newState = postReducer(
        initialPostState,
        PostActions.loadPosts({ id: 5 })
      );
      expect(newState).toEqual({
        ...initialPostState,
        loading: true,
        error: false,
      });
    });
  });

  describe('LoadPostsSuccess', () => {
    it(`should set Posts to received data
        and loading and error to false`, () => {
      const newState = postReducer(
        initialPostState,
        PostActions.loadPostsSuccess({ posts: mockPostList })
      );
      expect(newState).toEqual({
        ...initialPostState,
        loading: false,
        entities: mapPostsToEntities(addImageToPost(mockPostList)),
        error: false,
        ids: mockPostList.map((post) => post.id),
      });
    });
  });

  describe('LoadPostsError', () => {
    it('should set loading to false and error to true', () => {
      const newState = postReducer(
        initialPostState,
        PostActions.loadPostsError()
      );
      expect(newState).toEqual({
        ...initialPostState,
        loading: false,
        error: true,
      });
    });
  });

  describe('SetSelectedPostID', () => {
    it('should set the selected Post ID', () => {
      const newState = postReducer(
        initialPostState,
        PostActions.setSelectedPostID({ id: 5 })
      );
      expect(newState).toEqual({
        ...initialPostState,
        selectedPostID: 5,
      });
    });
  });

  describe('ClearPosts', () => {
    it('should set posts to an empty array', () => {
      const newState = postReducer(
        { ...initialPostState, entities: mapPostsToEntities(mockPostList) },
        PostActions.clearPosts()
      );
      expect(newState).toEqual({
        ...initialPostState,
      });
    });
  });

  describe('ClearSelectedPostID', () => {
    const newState = postReducer(
      { ...initialPostState, selectedPostID: 5 },
      PostActions.clearSelectedPostID()
    );
    expect(newState).toEqual(initialPostState);
  });

  describe('Unknown action', () => {
    it('should return the original state without modifications', () => {
      const newState = postReducer(initialPostState, { type: null });
      expect(newState).toEqual(initialPostState);
    });
  });
});
