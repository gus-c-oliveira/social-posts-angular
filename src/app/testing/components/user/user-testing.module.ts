import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserCardComponent } from './user-card.component.stub';
import { UserListComponent } from './user-list.component.stub';
import { UserPostComponent } from './user-post.component.stub';
import { UserProfileComponent } from './user-profile.component.stub';

@NgModule({
  imports: [CommonModule],
  declarations: [
    UserCardComponent,
    UserListComponent,
    UserPostComponent,
    UserProfileComponent,
  ],
  exports: [
    UserCardComponent,
    UserListComponent,
    UserPostComponent,
    UserProfileComponent,
  ],
})
export class UserModule {}
