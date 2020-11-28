import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffects } from './effects/index';
import { userReducer } from './reducer/index';
import { USER_STATE_KEY } from './state/index';
import { UserService } from './service/index';
import { USER_SERVICE_BASE_URL } from './token';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_STATE_KEY, userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [UserService, { provide: USER_SERVICE_BASE_URL, useValue: '/' }],
})
export class UserStoreModule {}
