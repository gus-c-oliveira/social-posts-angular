import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CommentEffects } from './effects/index';
import { commentReducer } from './reducer/index';
import { CommentService } from './service/index';
import { COMMENT_STATE_KEY } from './state/index';
import { COMMENT_SERVICE_BASE_URL } from './token';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(COMMENT_STATE_KEY, commentReducer),
    EffectsModule.forFeature([CommentEffects]),
  ],
  providers: [
    CommentService,
    { provide: COMMENT_SERVICE_BASE_URL, useValue: '/' },
  ],
})
export class CommentStoreModule {}
