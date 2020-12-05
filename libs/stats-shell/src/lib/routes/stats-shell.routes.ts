import { Route } from '@angular/router';

import { StatsPageComponent } from '../components/index';

export const ROUTES: Route[] = [
  { path: '', component: StatsPageComponent },
  { path: '**', redirectTo: '' },
];
