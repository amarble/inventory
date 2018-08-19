import { Routes } from '@angular/router';

import { ItemsListComponent } from './index';

export const itemsRoutes: Routes = [
  {
    path: 'items',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: ItemsListComponent },
    ]
  }
];
