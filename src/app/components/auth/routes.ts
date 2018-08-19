import { Routes } from '@angular/router';

import { LoginComponent, ResetPasswordComponent } from './index';

export const authRoutes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'login/:reset', component: LoginComponent },
      { path: 'reset', component: ResetPasswordComponent },
      { path: 'reset/:token', component: ResetPasswordComponent },
      { path: 'reset/:token/:new', component: ResetPasswordComponent }
    ]
  }
];
