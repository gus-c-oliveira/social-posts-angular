import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PostEffects } from './effects/index';
import { postReducer } from './reducer/index';
import { PostService } from './service/index';
import { POST_STATE_KEY } from './state/index';
import { POST_SERVICE_BASE_URL } from './token';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(POST_STATE_KEY, postReducer),
    EffectsModule.forFeature([PostEffects]),
  ],
  providers: [PostService, { provide: POST_SERVICE_BASE_URL, useValue: '/' }],
})
export class PostStoreModule {}
