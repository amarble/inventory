import { Routes } from '@angular/router';

import { UserDetailsComponent, UserListComponent } from './index';

export const userRoutes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: UserListComponent },
      { path: 'new', component: UserDetailsComponent },
      { path: 'details/:id', component: UserDetailsComponent },
    ]
  }
];
