import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, USER_STATE_KEY } from './user.state';
import { User } from './user.model';

const getUserState = createFeatureSelector<UserState>(USER_STATE_KEY);

const getLoading = createSelector(
  getUserState,
  (state: UserState): boolean => !!state.loading
);

const getError = createSelector(
  getUserState,
  (state: UserState): boolean => !!state.error
);

const getUsers = createSelector(
  getUserState,
  (state: UserState): User[] => state.users || []
);

const getSelectedUserID = createSelector(
  getUserState,
  (state: UserState): number => state.selectedUserID
);

export const userQuery = {
  getLoading,
  getError,
  getSelectedUserID,
  getUsers,
};
