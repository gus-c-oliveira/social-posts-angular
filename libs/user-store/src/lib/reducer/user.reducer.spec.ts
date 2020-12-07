import { mockUserList } from '../mocks/index';
import {
  ClearSelectedUserID,
  LoadUsers,
  LoadUsersError,
  LoadUsersSuccess,
  SetSelectedUserID,
} from '../actions/index';
import { userReducer } from '../reducer/index';
import { initialUserState } from '../state/index';
import { addUserPicture, addUserFriends } from '../utils/index';

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
    it(`should set users to received data
        and loading and error to false`, () => {
      const newState = userReducer(
        initialUserState,
        new LoadUsersSuccess(mockUserList)
      );
      expect(newState).toEqual({
        ...initialUserState,
        loading: false,
        users: addUserPicture(addUserFriends(mockUserList)),
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

  describe('ClearSelectedUserID', () => {
    it('should clear the selected user ID', () => {
      const newState = userReducer(
        { ...initialUserState, selectedUserID: 5 },
        new ClearSelectedUserID()
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
