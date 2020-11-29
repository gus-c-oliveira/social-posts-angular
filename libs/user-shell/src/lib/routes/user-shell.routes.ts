import { Route } from '@angular/router';

import {
  USER_LIST_PATH,
  USER_PROFILE_PATH,
  UserListComponent,
  UserProfileComponent,
  UserPageComponent,
} from '../components/index';

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
      },
    ],
  },
  {
    path: '**',
    redirectTo: USER_LIST_PATH,
  },
];
