import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/router';
import {
  CommentService,
  PostService,
  UserService,
  DataRequestService,
} from '@app/service';
import {
  appReducer,
  CommentEffects,
  PostEffects,
  UserEffects,
} from '@app/store';
import { UserModule } from '@app/user';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular
    BrowserModule,
    HttpClientModule,

    // Router
    AppRoutingModule,

    // Components
    UserModule,

    // Store
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([CommentEffects, PostEffects, UserEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [UserService, PostService, CommentService, DataRequestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
