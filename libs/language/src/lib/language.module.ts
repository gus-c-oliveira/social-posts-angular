import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageSelectorComponent } from './components/index';
import { LANGUAGE_STATE_KEY, languageReducer } from './store/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(LANGUAGE_STATE_KEY, languageReducer),
    TranslateModule,
  ],
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent],
})
export class LanguageModule {}
