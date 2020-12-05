import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentStoreModule } from '@gus/comment-store';
import { PostStoreModule } from '@gus/post-store';
import { UiModule } from '@gus/ui';
import { UserStoreModule } from '@gus/user-store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';

import en from '../assets/i18n/en-US.json';
import pt from '../assets/i18n/pt-BR.json';
import {
  UserCardComponent,
  UserListComponent,
  UserPageComponent,
  UserPostComponent,
  UserProfileComponent,
} from './components';
import { ROUTES } from './routes';

class LibTranslationLoader implements TranslateLoader {
  private locales = {
    'en-US': en,
    'pt-BR': pt,
  };

  public getTranslation(lang: string): Observable<any> {
    return from([this.locales[lang] || this.locales['en-US']]);
  }
}

function LibTranslationLoaderFactory() {
  return new LibTranslationLoader();
}

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: LibTranslationLoaderFactory,
      },
      isolate: true,
    }),
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
