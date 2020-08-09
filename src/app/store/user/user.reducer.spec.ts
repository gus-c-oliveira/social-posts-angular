import { mockUserList } from '@app/mocks';

import { LoadUsers, LoadUsersError, LoadUsersSuccess } from './user.actions';
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
    it('should set users to received data and loading to false', () => {
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
});
