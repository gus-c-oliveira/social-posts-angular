import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserListStubComponent } from './user-list.component.stub';
import { UserProfileStubComponent } from './user-profile.component.stub';

@NgModule({
  imports: [CommonModule],
  declarations: [UserListStubComponent, UserProfileStubComponent],
  exports: [UserListStubComponent, UserProfileStubComponent],
})
export class UserTestingModule {}
