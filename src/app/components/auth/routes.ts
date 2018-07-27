import { Routes } from '@angular/router';

import { LoginComponent } from './index';

export const authRoutes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
    ]
  }
];
