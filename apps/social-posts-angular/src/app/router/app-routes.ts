import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: 'user', loadChildren: '@gus/user-shell#UserShellModule' },
  { path: 'stats', loadChildren: '@gus/stats-shell#StatsShellModule' },
  { path: '**', redirectTo: 'user' },
];
