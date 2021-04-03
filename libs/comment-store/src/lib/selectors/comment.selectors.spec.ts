import { commentQuery } from './comment.selectors';
import {
  COMMENT_STATE_KEY,
  CommentState,
  initialCommentState,
} from '../state/index';
import { mapEntitiesToComments } from '../utils/index';

describe('Comment Selectors', () => {
  let store: { [COMMENT_STATE_KEY]: CommentState };

  beforeAll(() => {
    store = { [COMMENT_STATE_KEY]: initialCommentState };
  });

  it(`"getLoading" should return the current loading status`, () => {
    const selected = commentQuery.getLoading(store);
    expect(selected).toEqual(store[COMMENT_STATE_KEY].loading);
  });

  it(`"getComments" should return the current comments`, () => {
    const selected = commentQuery.getComments(store);
    expect(selected).toEqual(
      mapEntitiesToComments(store[COMMENT_STATE_KEY].entities)
    );
  });

  it(`"getError" should return the current error status`, () => {
    const selected = commentQuery.getError(store);
    expect(selected).toEqual(store[COMMENT_STATE_KEY].error);
  });
});
