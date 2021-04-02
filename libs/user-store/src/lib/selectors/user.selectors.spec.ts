import { Dictionary } from '@ngrx/entity';

import { mockUserList } from '../mocks/index';
import { User } from '../model/index';
import { initialUserState, USER_STATE_KEY, UserState } from '../state/index';
import { userQuery } from './user.selectors';

const mapEntitiesToUsers = (entities: Dictionary<User>): User[] => {
  return Object.keys(entities).map((id) => entities[id]);
};

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
    expect(selected).toEqual(
      mapEntitiesToUsers(store[USER_STATE_KEY].entities)
    );
  });

  it(`"getSelectedUserID" should return the ID
      of the currently selected user`, () => {
    store[USER_STATE_KEY].selectedUserID = 5;
    const selected = userQuery.getSelectedUserID(store);
    expect(selected).toEqual(store[USER_STATE_KEY].selectedUserID);
  });

  it(`"getUserByID" should return the user with the corresponding ID`, () => {
    const testID = 5;
    const selected = userQuery.getUserByID(store, { id: testID });
    const expectedUser = mockUserList.find((user) => user.id === testID);
    expect(selected).toEqual(expectedUser);
  });

  it(`"getError" should return the current error status`, () => {
    const selected = userQuery.getError(store);
    expect(selected).toEqual(store[USER_STATE_KEY].error);
  });
});
