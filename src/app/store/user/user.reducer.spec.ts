import { mockUserList } from '@app/mocks';

import {
  LoadUsers,
  LoadUsersError,
  LoadUsersSuccess,
  SetSelectedUserID,
} from './user.actions';
import { userReducer } from './user.reducer';
import { initialUserState } from './user.state';

describe('UserReducer', () => {
  describe('LoadUsers', () => {
    it('should set loading to true and error to false', () => {
      const newState = userReducer(initialUserState, new LoadUsers());
      expect(newState).toEqual({
        ...initialUserState,
        loading: true,
        error: false,
      });
    });
  });

  describe('LoadUsersSuccess', () => {
    it('should set users to received data and loading and error to false', () => {
      const newState = userReducer(
        initialUserState,
        new LoadUsersSuccess(mockUserList)
      );
      expect(newState).toEqual({
        ...initialUserState,
        loading: false,
        users: mockUserList,
        error: false,
      });
    });
  });

  describe('LoadUsersError', () => {
    it('should set loading to false and error to true', () => {
      const newState = userReducer(initialUserState, new LoadUsersError());
      expect(newState).toEqual({
        ...initialUserState,
        loading: false,
        error: true,
      });
    });
  });

  describe('SetSelectedUserID', () => {
    it('should set the selected user ID', () => {
      const newState = userReducer(initialUserState, new SetSelectedUserID(5));
      expect(newState).toEqual({
        ...initialUserState,
        selectedUserID: 5,
      });
    });
  });

  describe('Unknown action', () => {
    it('should return the original state without modifications', () => {
      const newState = userReducer(initialUserState, { type: null });
      expect(newState).toEqual(initialUserState);
    });
  });
});
