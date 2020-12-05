import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { languageReducer, LANGUAGE_STATE_KEY } from './store/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(LANGUAGE_STATE_KEY, languageReducer),
  ],
})
export class LanguageModule {}
