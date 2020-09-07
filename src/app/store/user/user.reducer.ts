import { UserAction, UserActionTypes } from './user.actions';
import { initialUserState, UserState } from './user.state';
import { User } from './user.model';

// Since User objects provided by the 3rd party API don't
// include user profile pictures, manually add one for each.
const userProfilePictures = [
  'assets/img/emoji-flirt.svg',
  'https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ',
  'https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk',
  'https://i.picsum.photos/id/1012/3973/2639.jpg?hmac=s2eybz51lnKy2ZHkE2wsgc6S81fVD1W2NKYOSh8bzDc',
  'https://i.picsum.photos/id/633/1818/1228.jpg?hmac=dyjPGybYgWgnTXC3lPjV-rap_PQUlnC0O6vCkhP_-HE',
  'https://i.picsum.photos/id/685/3000/2000.jpg?hmac=GLauGOEYjS7xOFx_wgC1vpX7_QRZNjtK4Dk-1OCZ1BI',
  'https://i.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg',
  'https://i.picsum.photos/id/349/3264/2176.jpg?hmac=WNt0QoaZyFRaiL5yitDV4LOXzdHV5Z9tHUxbc6KdBSY',
  'https://i.picsum.photos/id/823/5616/3744.jpg?hmac=aUM263SMqOF0mo3zsTkx2otCCV-0D3gyrzULgBEpk5Q',
  'https://i.picsum.photos/id/453/2048/1365.jpg?hmac=A8uxtdn4Y600Z5b2ngnn9hCXAx8sUnOVzprtDnz6DK8',
  'https://i.picsum.photos/id/822/5616/3744.jpg?hmac=8zzCg2OZ3IRmNTyFii2msfkUBNgzAD8YMpBbbRsIdqk',
];

export const addUserPicture = (user: User): User => ({
  ...user,
  pictureURL: userProfilePictures[user.id] || userProfilePictures[0],
});

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
        users: action.users.map(addUserPicture),
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
