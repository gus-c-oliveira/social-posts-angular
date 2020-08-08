import { Routes } from '@angular/router';
import {
  UserListComponent,
  UserPostComponent,
  UserProfileComponent,
} from '@app/user';

export const APP_ROUTES: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'user-post', component: UserPostComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: '**', component: UserListComponent },
];
