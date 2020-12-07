import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, USER_STATE_KEY } from '../state/index';
import { User, SimpleUser } from '../model/index';

const getUserState = createFeatureSelector<UserState>(USER_STATE_KEY);

export const mapUserToSimpleUser = (user: User): SimpleUser => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  pictureURL: user.pictureURL || '',
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

const getSelectedUser = createSelector(
  getUserState,
  (state: UserState): User =>
    state.users.find((user) => user.id === state.selectedUserID)
);

const getUserByID = (id: number) =>
  createSelector(
    getUserState,
    (state: UserState): User => state.users.find((user) => user.id === id)
  );

export const userQuery = {
  getLoading,
  getError,
  getSelectedUserID,
  getUsers,
  getSimpleUsers,
  getSelectedUser,
  getUserByID,
};
