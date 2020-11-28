import { User } from '../model/index';

export const USER_STATE_KEY = 'user';

export interface UserState {
  users: User[];
  selectedUserID: number;
  loading: boolean;
  error: boolean;
}

export const initialUserState: UserState = {
  users: [],
  selectedUserID: null,
  loading: false,
  error: false,
};
