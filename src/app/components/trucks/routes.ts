import { Routes } from '@angular/router';

import { TruckDetailsComponent, TruckListComponent } from './index';

export const truckRoutes: Routes = [
  {
    path: 'trucks',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: TruckListComponent },
      { path: 'details', component: TruckDetailsComponent },
    ]
  }
];
