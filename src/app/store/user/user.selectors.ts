import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, USER_STATE_KEY } from './user.state';
import { User, SimpleUser } from './user.model';

const getUserState = createFeatureSelector<UserState>(USER_STATE_KEY);

export const mapUserToSimpleUser = (user: User): SimpleUser => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
});

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

const getSimpleUsers = createSelector(
  getUserState,
  (state: UserState): SimpleUser[] =>
    state.users.map((user) => mapUserToSimpleUser(user))
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
  getSimpleUsers,
};
