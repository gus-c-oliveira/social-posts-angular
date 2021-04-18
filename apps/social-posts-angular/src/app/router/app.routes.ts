import { Routes } from '@angular/router';
import { AuthComponent, AuthGuardService } from '@gus/auth';

export const USER_AREA_PATH = 'user';
export const AUTH_AREA_PATH = 'auth';

export const APP_ROUTES: Routes = [
  {
    path: USER_AREA_PATH,
    loadChildren: () =>
      import('@gus/user-shell').then((m) => m.UserShellModule),
    canActivate: [AuthGuardService],
  },
  {
    path: AUTH_AREA_PATH,
    component: AuthComponent,
  },
  { path: '**', redirectTo: AUTH_AREA_PATH },
];
