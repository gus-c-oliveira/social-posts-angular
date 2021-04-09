import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/router';
import { LanguageModule } from '@gus/language';
import { POST_SERVICE_BASE_URL } from '@gus/post-store';
import { UiModule } from '@gus/ui';
import { USER_SERVICE_BASE_URL } from '@gus/user-store';
import { EffectsModule } from '@ngrx/effects';
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

    // Ui
    UiModule,

    // Store
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    // Translations
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    LanguageModule,
  ],
  providers: [
    { provide: POST_SERVICE_BASE_URL, useValue: APP_CONSTANTS.baseURL },
    { provide: USER_SERVICE_BASE_URL, useValue: APP_CONSTANTS.baseURL },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
