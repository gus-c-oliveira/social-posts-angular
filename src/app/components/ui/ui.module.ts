import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from './button';
import { ErrorComponent } from './error';
import { HeaderComponent } from './header';
import { LanguageSelectorComponent } from './language-selector';
import { SpinnerComponent } from './spinner';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [
    ButtonComponent,
    ErrorComponent,
    HeaderComponent,
    LanguageSelectorComponent,
    SpinnerComponent,
  ],
  exports: [
    ButtonComponent,
    ErrorComponent,
    HeaderComponent,
    LanguageSelectorComponent,
    SpinnerComponent,
  ],
})
export class UiModule {}
