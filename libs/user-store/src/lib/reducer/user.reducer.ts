import { UserAction, UserActionTypes } from '../actions/index';
import { initialUserState, UserState } from '../state/index';
import { addUserFriends, addUserPicture } from '../utils/index';

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
      const users = addUserFriends(addUserPicture(action.users));
      return {
        ...state,
        users,
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
    case UserActionTypes.ClearSelectedUserID:
      return {
        ...state,
        selectedUserID: null,
      };
    default:
      return state;
  }
};
