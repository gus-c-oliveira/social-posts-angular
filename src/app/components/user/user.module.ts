import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from '@app/ui';

import { UserCardComponent } from './card';
import { UserListComponent } from './list';
import { UserPostComponent } from './post';
import { UserProfileComponent } from './profile';

@NgModule({
  imports: [CommonModule, OverlayModule, UiModule],
  declarations: [
    UserCardComponent,
    UserListComponent,
    UserPostComponent,
    UserProfileComponent,
  ],
  exports: [UserListComponent, UserPostComponent, UserProfileComponent],
  entryComponents: [UserPostComponent],
})
export class UserModule {}
