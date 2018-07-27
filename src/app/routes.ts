import { Routes } from '@angular/router';

import { authRoutes } from './components/auth/routes';
import { truckRoutes } from './components/trucks/routes';
import { userRoutes } from './components/users/routes';

export const APP_ROUTER_PROVIDERS: Routes = [
  ...authRoutes,
  ...truckRoutes,
  ...userRoutes
];
