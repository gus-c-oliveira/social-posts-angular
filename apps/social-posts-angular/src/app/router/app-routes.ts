import { Routes } from '@angular/router';
import {
  USER_LIST_PATH,
  USER_PROFILE_PATH,
  UserListComponent,
  UserProfileComponent,
} from '@app/user';

export const APP_ROUTES: Routes = [
  { path: USER_LIST_PATH, component: UserListComponent },
  { path: USER_PROFILE_PATH, component: UserProfileComponent },
  { path: '**', component: UserListComponent },
];
