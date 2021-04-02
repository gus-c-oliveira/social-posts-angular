import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, USER_STATE_KEY, adapter } from '../state/index';
import { User, SimpleUser } from '../model/index';

const getUserState = createFeatureSelector<UserState>(USER_STATE_KEY);

const adapterSelectors = adapter.getSelectors();

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

const getUsers = createSelector(getUserState, adapterSelectors.selectAll);

const getSimpleUsers = createSelector(getUsers, (users: User[]): SimpleUser[] =>
  users.map((user) => mapUserToSimpleUser(user))
);

const getSelectedUserID = createSelector(
  getUserState,
  (state: UserState): number => state.selectedUserID
);

const getUserEntities = createSelector(
  getUserState,
  adapterSelectors.selectEntities
);

const getSelectedUser = createSelector(
  getUserEntities,
  getSelectedUserID,
  (entities: { [id: number]: User }, selectedUserID: number): User =>
    entities[selectedUserID]
);

const getUserByID = createSelector(
  getUserEntities,
  (entities: { [id: number]: User }, props: { id: number }) =>
    entities[props.id]
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
