import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserListComponent } from './list';
import { UserPostComponent } from './post';
import { UserProfileComponent } from './profile';

@NgModule({
  imports: [CommonModule],
  declarations: [UserListComponent, UserPostComponent, UserProfileComponent],
  exports: [UserListComponent, UserPostComponent, UserProfileComponent],
})
export class UserModule {}
