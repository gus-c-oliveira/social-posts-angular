import { userReducer } from './user.reducer';
import { initialUserState } from './user.state';

describe('UserReducer', () => {
  it('should return the user initial state', () => {
    const returnedState = userReducer(null, null);
    expect(returnedState).toEqual(initialUserState);
  });
});
