import { ActionReducerMap } from '@ngrx/store';

import { commentReducer } from '../comment';
import { postReducer } from '../post';
import { AppState } from './app.state';

export const appReducer: ActionReducerMap<AppState, any> = {
  post: postReducer,
  comment: commentReducer,
};
