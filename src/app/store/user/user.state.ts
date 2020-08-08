import { User } from './user.model';

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