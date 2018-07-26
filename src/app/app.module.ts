import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TruckDetailsComponent } from './components/trucks/truck-details/truck-details.component';
import { TruckListComponent } from './components/trucks/truck-list/truck-list.component';

import { APP_ROUTER_PROVIDERS } from './routes';
import { UserListComponent } from './components/users/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TruckDetailsComponent,
    TruckListComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTER_PROVIDERS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
