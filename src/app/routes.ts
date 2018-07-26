import { Routes } from '@angular/router';

import { truckRoutes } from './components/trucks/routes';
import { userRoutes } from './components/users/routes';

export const APP_ROUTER_PROVIDERS: Routes = [
  ...truckRoutes,
  ...userRoutes
];
