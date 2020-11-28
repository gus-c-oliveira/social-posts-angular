import { ActionReducerMap } from '@ngrx/store';

import { commentReducer } from '../comment';
import { AppState } from './app.state';

export const appReducer: ActionReducerMap<AppState, any> = {
  comment: commentReducer,
};
