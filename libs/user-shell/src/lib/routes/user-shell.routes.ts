import { Route } from '@angular/router';

import {
  UserListComponent,
  UserProfileComponent,
  UserPageComponent,
} from '../components/index';
import { USER_LIST_PATH, USER_PROFILE_PATH } from './paths';
import { ProfileGuardService } from './profile-guard.service';

export const ROUTES: Route[] = [
  {
    path: '',
    component: UserPageComponent,
    children: [
      {
        path: '',
        redirectTo: USER_LIST_PATH,
        pathMatch: 'full',
      },
      {
        path: USER_LIST_PATH,
        component: UserListComponent,
      },
      {
        path: USER_PROFILE_PATH,
        component: UserProfileComponent,
        canActivate: [ProfileGuardService],
      },
    ],
  },
  {
    path: '**',
    redirectTo: USER_LIST_PATH,
  },
];
