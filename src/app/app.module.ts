import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material imports
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatStepperModule,
  MatToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TruckDetailsComponent } from './components/trucks/truck-details/truck-details.component';
import { TruckListComponent } from './components/trucks/truck-list/truck-list.component';

import { APP_ROUTER_PROVIDERS } from './routes';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthInterceptor } from './services/authInterceptor';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ServerErrorComponent } from './dialogs/server-error/server-error.component';
import { ItemsListComponent } from './components/items/items-list/items-list.component';
import { ItemThumbnailComponent } from './components/items/item-thumbnail/item-thumbnail.component';
import { ItemViewComponent } from './components/items/item-view/item-view.component';
import { NewItemComponent } from './dialogs/new-item/new-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TruckDetailsComponent,
    TruckListComponent,
    UserListComponent,
    LoginComponent,
    UserDetailsComponent,
    ResetPasswordComponent,
    ServerErrorComponent,
    ItemsListComponent,
    ItemThumbnailComponent,
    ItemViewComponent,
    NewItemComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTER_PROVIDERS),
    // Material imports
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule
  ],
  entryComponents: [
    ServerErrorComponent,
    NewItemComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
