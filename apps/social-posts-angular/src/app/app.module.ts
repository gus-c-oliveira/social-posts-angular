import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/router';
import { DataRequestService } from '@app/service';
import { appReducer, CommentEffects, PostEffects } from '@app/store';
import { UserModule } from '@app/user';
import { UiModule } from '@gus/ui';
import { USER_SERVICE_BASE_URL, UserStoreModule } from '@gus/user-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { APP_CONSTANTS } from './app.constants';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular
    BrowserModule,
    HttpClientModule,

    // Router
    AppRoutingModule,

    // Libs
    UiModule,
    UserStoreModule,

    // Components
    UserModule,

    // Store
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([CommentEffects, PostEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    // Translations
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    DataRequestService,
    { provide: USER_SERVICE_BASE_URL, useValue: APP_CONSTANTS.baseURL },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
