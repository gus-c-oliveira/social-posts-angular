import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: 'user', loadChildren: '@gus/user-shell#UserShellModule' },
  { path: '**', redirectTo: 'user' },
];
