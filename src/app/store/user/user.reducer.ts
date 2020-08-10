import { UserAction, UserActionTypes } from './user.actions';
import { initialUserState, UserState } from './user.state';

export const userReducer = (
  state: UserState = initialUserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.LoadUsers:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UserActionTypes.LoadUsersSuccess:
      return {
        ...state,
        users: action.users,
        loading: false,
        error: false,
      };
    case UserActionTypes.LoadUsersError:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UserActionTypes.SetSelectedUserID:
      return {
        ...state,
        selectedUserID: action.id,
      };
    default:
      return state;
  }
};
