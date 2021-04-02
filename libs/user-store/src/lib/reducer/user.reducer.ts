import { createReducer, on } from '@ngrx/store';

import { UserActions } from '../actions/index';
import { User } from '../model/index';
import { adapter, initialUserState } from '../state/index';
import { addUserFriends, addUserPicture } from '../utils/index';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(UserActions.loadUsersSuccess, (state, action) => {
    const users: User[] = addUserFriends(addUserPicture(action.users));
    return adapter.addAll(users, { ...state, loading: false, error: false });
  }),
  on(UserActions.loadUsersError, (state) => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(UserActions.setSelectedUserID, (state, action) => ({
    ...state,
    selectedUserID: action.id,
  })),
  on(UserActions.clearSelectedUserID, (state) => ({
    ...state,
    selectedUserID: null,
  }))
);
