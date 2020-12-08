import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentStoreModule } from '@gus/comment-store';
import { PostStoreModule } from '@gus/post-store';
import {
  LanguageModule,
  LibTranslationLoaderFactory,
  TRANSLATIONS_TOKEN,
} from '@gus/language';
import { UiModule } from '@gus/ui';
import { UserStoreModule } from '@gus/user-store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import en from '../assets/i18n/en-US.json';
import pt from '../assets/i18n/pt-BR.json';
import {
  UserCardComponent,
  UserListComponent,
  UserPageComponent,
  UserPostComponent,
  UserProfileComponent,
} from './components/index';
import { ProfileGuardService, ROUTES } from './routes/index';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: LibTranslationLoaderFactory,
        deps: [TRANSLATIONS_TOKEN],
      },
      isolate: true,
    }),
    UiModule,
    RouterModule.forChild(ROUTES),
    CommentStoreModule,
    PostStoreModule,
    UserStoreModule,
    LanguageModule,
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
  providers: [
    {
      provide: TRANSLATIONS_TOKEN,
      useValue: {
        'en-US': en,
        'pt-BR': pt,
      },
    },
    ProfileGuardService,
  ],
})
export class UserShellModule {}
