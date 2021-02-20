import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PostEffects } from './effects/index';
import { postReducer } from './reducer/index';
import { PostService } from './service/index';
import { POST_STATE_KEY } from './state/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(POST_STATE_KEY, postReducer),
    EffectsModule.forFeature([PostEffects]),
  ],
  providers: [PostService],
})
export class PostStoreModule {}
