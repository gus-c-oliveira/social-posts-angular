import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { User } from '../model/index';

export const USER_STATE_KEY = 'user';

export interface UserState extends EntityState<User> {
  error: boolean;
  loading: boolean;
  selectedUserID: number;
}

export const adapter = createEntityAdapter<User>();

export const initialUserState: UserState = adapter.getInitialState({
  error: false,
  loading: false,
  selectedUserID: null,
});
