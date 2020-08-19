import { ActionReducerMap } from '@ngrx/store';

import { postReducer } from '../post';
import { userReducer } from '../user';
import { AppState } from './app.state';

export const appReducer: ActionReducerMap<AppState, any> = {
  user: userReducer,
  post: postReducer,
};
