import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserCardStubComponent } from './user-card.component.stub';
import { UserListStubComponent } from './user-list.component.stub';
import { UserPostStubComponent } from './user-post.component.stub';
import { UserProfileStubComponent } from './user-profile.component.stub';

@NgModule({
  imports: [CommonModule],
  declarations: [
    UserCardStubComponent,
    UserListStubComponent,
    UserPostStubComponent,
    UserProfileStubComponent,
  ],
  exports: [
    UserCardStubComponent,
    UserListStubComponent,
    UserPostStubComponent,
    UserProfileStubComponent,
  ],
})
export class UserTestingModule {}
