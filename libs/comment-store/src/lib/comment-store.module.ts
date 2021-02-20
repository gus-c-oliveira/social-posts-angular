import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CommentEffects } from './effects/index';
import { commentReducer } from './reducer/index';
import { CommentService } from './service/index';
import { COMMENT_STATE_KEY } from './state/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(COMMENT_STATE_KEY, commentReducer),
    EffectsModule.forFeature([CommentEffects]),
  ],
  providers: [CommentService],
})
export class CommentStoreModule {}
