import { Routes } from '@angular/router';

import { UserListComponent } from './index';

export const userRoutes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: UserListComponent },
      // { path: 'details', component: UserDetailsComponent },
    ]
  }
];
