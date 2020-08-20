import { postQuery } from './post.selectors';
import { initialPostState, POST_STATE_KEY, PostState } from './post.state';

describe('Post Selectors', () => {
  let store: { [POST_STATE_KEY]: PostState };

  beforeEach(() => {
    store = { [POST_STATE_KEY]: initialPostState };
  });

  it(`"getLoading" should return the current loading status`, () => {
    const selected = postQuery.getLoading(store);
    expect(selected).toEqual(store[POST_STATE_KEY].loading);
  });

  it(`"getPosts" should return the current posts`, () => {
    const selected = postQuery.getPosts(store);
    expect(selected).toEqual(store[POST_STATE_KEY].posts);
  });

  it(`"getSelectedPostID" should return the ID of the currently selected post`, () => {
    store[POST_STATE_KEY].selectedPostID = 5;
    const selected = postQuery.getSelectedPostID(store);
    expect(selected).toEqual(store[POST_STATE_KEY].selectedPostID);
  });

  it(`"getError" should return the current error status`, () => {
    const selected = postQuery.getError(store);
    expect(selected).toEqual(store[POST_STATE_KEY].error);
  });
});
