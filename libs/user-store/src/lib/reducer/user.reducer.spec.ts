import { Dictionary } from '@ngrx/entity';

import { UserActions } from '../actions/index';
import { mockUserList } from '../mocks/index';
import { User } from '../model/index';
import { userReducer } from '../reducer/index';
import { initialUserState } from '../state/index';
import { addUserFriends, addUserPicture } from '../utils/index';

const mapUsersToEntities = (users: User[]): Dictionary<User> => {
  const entities: Dictionary<User> = {};
  users.forEach((user) => (entities[user.id] = user));
  return entities;
};

describe('UserReducer', () => {
  describe('LoadUsers', () => {
    it('should set loading to true and error to false', () => {
      const newState = userReducer(initialUserState, UserActions.loadUsers());
      expect(newState).toEqual({
        ...initialUserState,
        loading: true,
        error: false,
      });
    });
  });

  describe('LoadUsersSuccess', () => {
    it(`should set users to received data
        and loading and error to false`, () => {
      const newState = userReducer(
        initialUserState,
        UserActions.loadUsersSuccess({ users: mockUserList })
      );
      expect(newState).toEqual({
        ...initialUserState,
        loading: false,
        entities: mapUsersToEntities(
          addUserFriends(addUserPicture(mockUserList))
        ),
        ids: mockUserList.map((user) => user.id),
        error: false,
      });
    });
  });

  describe('LoadUsersError', () => {
    it('should set loading to false and error to true', () => {
      const newState = userReducer(
        initialUserState,
        UserActions.loadUsersError()
      );
      expect(newState).toEqual({
        ...initialUserState,
        loading: false,
        error: true,
      });
    });
  });

  describe('SetSelectedUserID', () => {
    it('should set the selected user ID', () => {
      const newState = userReducer(
        initialUserState,
        UserActions.setSelectedUserID({ id: 5 })
      );
      expect(newState).toEqual({
        ...initialUserState,
        selectedUserID: 5,
      });
    });
  });

  describe('ClearSelectedUserID', () => {
    it('should clear the selected user ID', () => {
      const newState = userReducer(
        { ...initialUserState, selectedUserID: 5 },
        UserActions.clearSelectedUserID()
      );
      expect(newState).toEqual({ ...initialUserState });
    });
  });

  describe('Unknown action', () => {
    it('should return the original state without modifications', () => {
      const newState = userReducer(initialUserState, { type: null });
      expect(newState).toEqual(initialUserState);
    });
  });
});
