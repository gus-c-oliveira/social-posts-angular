import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentStoreModule } from '@gus/comment-store';
import { PostStoreModule } from '@gus/post-store';
import { UiModule } from '@gus/ui';
import { UserStoreModule } from '@gus/user-store';
import { TranslateModule } from '@ngx-translate/core';

import {
  UserCardComponent,
  UserListComponent,
  UserPageComponent,
  UserPostComponent,
  UserProfileComponent,
} from './components/index';
import { ROUTES } from './routes/index';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    TranslateModule,
    UiModule,
    RouterModule.forChild(ROUTES),
    CommentStoreModule,
    PostStoreModule,
    UserStoreModule,
  ],
  declarations: [
    UserCardComponent,
    UserListComponent,
    UserPageComponent,
    UserPostComponent,
    UserProfileComponent,
  ],
  exports: [
    UserListComponent,
    UserPageComponent,
    UserPostComponent,
    UserProfileComponent,
  ],
  entryComponents: [UserPostComponent],
})
export class UserShellModule {}
