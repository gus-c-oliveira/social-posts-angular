import { userQuery } from './user.selectors';
import { initialUserState, UserState, USER_STATE_KEY } from './user.state';

describe('User Selectors', () => {
  let store: { [USER_STATE_KEY]: UserState };

  beforeEach(() => {
    store = { [USER_STATE_KEY]: initialUserState };
  });

  it(`"getLoading" should return the current loading status`, () => {
    const selected = userQuery.getLoading(store);
    expect(selected).toEqual(store[USER_STATE_KEY].loading);
  });

  it(`"getUsers" should return the current users`, () => {
    const selected = userQuery.getUsers(store);
    expect(selected).toEqual(store[USER_STATE_KEY].users);
  });

  it(`"getSelectedUserID" should return the ID of the currently selected user`, () => {
    store[USER_STATE_KEY].selectedUserID = 5;
    const selected = userQuery.getSelectedUserID(store);
    expect(selected).toEqual(store[USER_STATE_KEY].selectedUserID);
  });

  it(`"getError" should return the current error status`, () => {
    const selected = userQuery.getError(store);
    expect(selected).toEqual(store[USER_STATE_KEY].error);
  });
});
