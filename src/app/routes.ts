import { Routes } from '@angular/router';

import { authRoutes } from './components/auth/routes';
import { itemsRoutes } from './components/items/routes';
import { userRoutes } from './components/users/routes';

export const APP_ROUTER_PROVIDERS: Routes = [
  ...authRoutes,
  ...itemsRoutes,
  ...userRoutes
];
